const Check = require("../models/check");

const checks = {};

const addCheck = (username, checkData) => {
  const newCheck = new Check(checkData);
  if (username in checks) {
    checks[username][newCheck.id] = newCheck;
  } else {
    checks[username] = {};
    checks[username][newCheck.id] = newCheck;
  }

  return newCheck;
};

const getCheck = (username, checkId) => {
  return checks[username][checkId];
};

const deleteCheck = (username, checkId) => {
  if (!checks[username]) return;
  const deletedCheck = getCheck(username, checkId);
  delete checks[username][checkId];
  return deletedCheck;
};

const updateCheck = (username, checkId, newFields) => {
  let checkToUpdate = getCheck(username, checkId);
  if (!checkToUpdate) return;

  checkToUpdate = { ...checkToUpdate, ...newFields };
  checks[username][checkId] = checkToUpdate;

  return checkToUpdate;
};

const getAllChecks = () => {
  return checks;
};

module.exports = {
  addCheck,
  getCheck,
  deleteCheck,
  updateCheck,
  getAllChecks,
};
