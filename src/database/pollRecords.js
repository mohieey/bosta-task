const PollRecord = require("../models/pollRecord");
const { updateCheck } = require("./checks");

module.exports = function (check, response) {
  updateCheck(check.user, check._id, { lastStatus: response.status });

  new PollRecord({
    status: response.status,
    statusText: response.statusText,
    responseTime: response.responseTime,
    assertion: check.assert.statusCode === response.status,
    check: check._id,
  }).save();
};
