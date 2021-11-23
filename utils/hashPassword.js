const crypto = require("crypto");
const { SALT } = require("../env");

module.exports = (password) => {
  hashedPassword = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, `sha512`)
    .toString(`hex`);

  return hashedPassword;
};
