const Check = require("../../../../models/check");

module.exports = async (checkId) => {
  const check = Check.findOne({
    _id: checkId,
    "channels.mail.0": { $exists: true },
  });

  return check;
};
