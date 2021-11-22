const express = require("express");

const { addUser, getUser } = require("../database/users");
const validateUser = require("../utils/validateUser");
const {
  generateCode,
  sendVerificationCode,
} = require("../utils/emailVerification");

const router = express.Router();

router.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const { username, password, email } = req.body;

  let user = await getUser(username);
  if (user) return res.send("dublicate username!");

  const token = addUser(username, password, email);
  const verificationCode = generateCode(username);
  sendVerificationCode(username, email, verificationCode);

  return res.send(token);
});

module.exports = router;
