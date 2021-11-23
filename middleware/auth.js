const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../env");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied, No token provided.");

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
};
