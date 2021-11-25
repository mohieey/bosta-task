// const Check = require("../models/check");
const Check = require("../models/check");

const addCheck = (userId, checkData) => {
  const newCheck = initializeCheckData(userId, checkData);
  newCheck.save();

  return newCheck;
};

const initializeCheckData = (userId, checkData) => {
  const data = { ...checkData, user: userId };
  data.channels = {
    mail: [data.mail],
    webhook: [data.webhook],
    pushover: [data.pushover],
  };
  delete data.mail;
  delete data.webhook;
  delete data.pushover;

  return new Check(data);
};

const getCheck = async (userId, checkId) => {
  return await Check.findOne({ user: userId, _id: checkId }).populate(
    "pollRecords"
  );
};

const getChecksByTag = async (userId, tag) => {
  return await Check.find({ user: userId, tags: tag }).populate("pollRecords");
};

const deleteCheck = async (userId, checkId) => {
  const deletedCheck = await Check.findOneAndDelete({
    user: userId,
    _id: checkId,
  });

  return deletedCheck;
};

const updateCheck = async (userId, checkId, newFields) => {
  let checkToUpdate = await Check.findOneAndUpdate(
    { user: userId, _id: checkId },
    newFields
  );
  if (!checkToUpdate) return;

  return checkToUpdate;
};

const getAllChecks = async (userId) => {
  return await Check.find({ user: userId });
};

module.exports = {
  addCheck,
  getCheck,
  getChecksByTag,
  deleteCheck,
  updateCheck,
  getAllChecks,
};
