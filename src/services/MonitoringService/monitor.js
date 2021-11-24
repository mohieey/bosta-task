const getInstance = require("../../utils/configureRequests");

const PollRecord = require("../../models/pollRecord");
const Check = require("../../models/check");
const savePollRecord = require("../../database/pollRecords");
const notifyService = require("../notificationService/notifyService");

const runningMonitors = {};

const recoverFromOutages = (runningChecks) => {
  runningChecks.forEach((check) => startMonitoring(check));
};

const startMonitoring = (check) => {
  Check.findByIdAndUpdate(check._id, { running: true }).then();
  runningMonitors[check.id + check.user] = watchGenerator(check);
};

const stopMonitoring = (checkId, userId) => {
  if (!runningMonitors[checkId + userId]) return false;

  Check.findByIdAndUpdate(checkId, { running: false }).then();

  clearInterval(runningMonitors[checkId + userId]);
  delete runningMonitors[checkId + userId];
  return true;
};

const watchGenerator = (check) => {
  let lastStatus = check.lastStatus || undefined;
  return setInterval(async () => {
    console.log(
      `polling check with name: ${check.name} and id: ${check.id} for user: ${check.user}`
    );

    response = await poll(check);
    if (response.status !== lastStatus) {
      // notify(check, response,lastStatus);
      notifyService.notify(check, response, lastStatus);
      console.log(`Notified user ${check.user} for check ${check.name}`);
    }

    lastStatus = response.status;
    savePollRecord(check, response);
  }, check.interval);
};

const poll = async (check) => {
  let response = {};
  let instance = getInstance(check);

  let start = Date.now();
  let end;

  try {
    response = await instance.get();
  } catch (error) {
    console.log("fail no 1");

    if (error.response) {
      console.log("Error", error.response.status);
      console.log("Error", error.response.statusText);
    } else {
      console.log("Error", 503);
    }
    for (let i = 1; i <= check.threshold - 1; i++) {
      start = Date.now();
      try {
        response = await instance.get();
        end = new Date();
        response["responseTime"] = end - start;
        return response;
      } catch (error) {
        console.log(`fail no ${i + 1}`);
        continue;
      }
    }
    let status = 503;
    let statusText = "Unavailable";
    if (error.response) {
      status = error.response.status;
      statusText = error.response.statusText;
    }
    return {
      status,
      statusText,
      responseTime: 0,
    };
  }

  end = Date.now();
  response["responseTime"] = end - start;
  console.log("Sucess", response.status);
  console.log("Sucess", response.statusText);
  return response;
};

module.exports = { startMonitoring, stopMonitoring, recoverFromOutages };
