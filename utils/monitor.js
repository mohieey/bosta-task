const axios = require("axios");
const getInstance = require("../utils/configureRequests");

const PollRecord = require("../models/pollRecord");

const runningMonitors = {};

const startMonitoring = (check) => {
  runningMonitors[check.id] = setInterval(async () => {
    const start = Date.now();

    console.log(`Check NO is ${check.name}`);

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

      check.history.push(new PollRecord(503, 0));

      return console.log("errr");
    }

    console.log(response.status);
    const end = Date.now();
    check.history.push(
      new PollRecord(
        response.status,
        end - start,
        check.assert.statusCode === response.status
      )
    );
  }, check.interval);
};

const stopMonitoring = (checkId) => {
  clearInterval(runningMonitors[checkId]);
  delete runningMonitors[checkId];
};

module.exports = { startMonitoring, stopMonitoring };
