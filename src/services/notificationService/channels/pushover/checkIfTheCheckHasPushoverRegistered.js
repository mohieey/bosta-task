const Check = require("../../../../models/check");

module.exports = async (checkId) => {
  const check = await Check.findOne({
    _id: checkId,
  });

  if (!check.pushover.APPTOKEN || !check.pushover.USERKEY) return null;

  return check;
};
