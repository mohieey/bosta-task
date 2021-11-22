const getInstance = require("../utils/configureRequests");

const PollRecord = require("../models/pollRecord");
const Check = require("../models/check");
const savePollRecord = require("../database/pollRecords");

const runningMonitors = {};

const startMonitoring = (check) => {
  runningMonitors[check.id + check.user] = watchGenerator(check);
};

const stopMonitoring = (checkIdUserId) => {
  if (!runningMonitors[checkIdUserId]) return false;

  clearInterval(runningMonitors[checkIdUserId]);
  delete runningMonitors[checkIdUserId];
  return true;
};

const watchGenerator = (check) => {
  let lastStatus;
  return setInterval(async () => {
    console.log(`Check NO is ${check.name}`);
    // console.log(`Check NO is ${check}`);

    response = await poll(check);
    if (response.status !== lastStatus) console.log("Notidiefd");
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

module.exports = { startMonitoring, stopMonitoring };
