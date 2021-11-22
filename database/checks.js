// const Check = require("../models/check");
const Check = require("../models/check");

const addCheck = (userId, checkData) => {
  const newCheck = new Check({ ...checkData, user: userId });
  newCheck.save();

  return newCheck;
};

const getCheck = async (userId, checkId) => {
  return await Check.findOne({ user: userId, _id: checkId });
};

const deleteCheck = async (userId, checkId) => {
  const deletedCheck = await Check.findOne({ user: userId, _id: checkId });

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

const getAllChecks = async () => {
  return await Check.find();
};

module.exports = {
  addCheck,
  getCheck,
  deleteCheck,
  updateCheck,
  getAllChecks,
};
