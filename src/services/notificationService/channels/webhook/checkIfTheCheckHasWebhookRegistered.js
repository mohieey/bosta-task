const Check = require("../../../../models/check");

module.exports = async (checkId) => {
  const check = await Check.findOne({
    _id: checkId,
  });

  if (check.webhook.length === 0) return null;

  return check;
};
