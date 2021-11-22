const axios = require("axios");
const getInstance = require("../utils/configureRequests");

const PollRecord = require("../models/pollRecord");

const runningMonitors = {};

const startMonitoring = (check) => {
  runningMonitors[check.id + check.user] = setInterval(async () => {
    const start = Date.now();

    console.log(`Check NO is ${check.name}`);
    console.log(`Check NO is ${check}`);

    let response;

    try {
      response = await getInstance(check).get();
    } catch (error) {
      console.log("fail no 1");
      console.log(error);
      for (let i = 1; i <= check.threshold - 1; i++) {
        try {
          response = await axios.get(url[1]);
        } catch (error) {
          console.log(`fail no ${i + 1}`);
          continue;
        }
      }

      new PollRecord({
        status: 503,
        responseTime: 0,
        check: check._id,
      }).save();

      return console.log("errr");
    }

    console.log(response.status);
    const end = Date.now();
    new PollRecord({
      status: response.status,
      responseTime: end - start,
      assertion: check.assert.statusCode === response.status,
      check: check._id,
    }).save();
  }, check.interval);
};

const stopMonitoring = (checkIdUserId) => {
  if (!runningMonitors[checkIdUserId]) return false;

  clearInterval(runningMonitors[checkIdUserId]);
  delete runningMonitors[checkIdUserId];
  return true;
};

module.exports = { startMonitoring, stopMonitoring };
