const Check = require("../models/check");
const PollRecord = require("../models/pollRecord");

module.exports = function (check, response) {
  Check.findByIdAndUpdate(check._id, { lastStatus: response.status }).then();
  new PollRecord({
    status: response.status,
    responseTime: response.responseTime,
    assertion: check.assert.statusCode === response.status,
    check: check._id,
  }).save();
};
