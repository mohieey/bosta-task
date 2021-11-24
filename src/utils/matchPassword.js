const hashPassword = require("./hashPassword");
module.exports = (passwordFromReqBody, hashedPasswordFromDB) => {
  const hashedPasswordFromReqBody = hashPassword(passwordFromReqBody);
  return hashedPasswordFromReqBody === hashedPasswordFromDB;
};
