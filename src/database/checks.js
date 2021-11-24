// const Check = require("../models/check");
const Check = require("../models/check");

const addCheck = (userId, checkData) => {
  const newCheck = new Check({ ...checkData, user: userId });
  newCheck.save();

  return newCheck;
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

const checkIfTheCheckHasMailsRegistered = async (checkId) => {
  const check = Check.findOne({
    _id: checkId,
    "channels.mail.0": { $exists: true },
  });

  return check;
};

module.exports = {
  addCheck,
  getCheck,
  getChecksByTag,
  deleteCheck,
  updateCheck,
  getAllChecks,
  checkIfTheCheckHasMailsRegistered,
};
