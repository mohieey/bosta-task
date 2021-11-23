const jwt = require("jsonwebtoken");
const { JWTPrivateKey } = require("../env");

module.exports = (user) => {
  const token = jwt.sign(user, JWTPrivateKey);
  return token;
};
