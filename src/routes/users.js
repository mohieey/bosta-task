const express = require("express");

const { addUser, getUser } = require("../database/users");
const validateUser = require("../utils/validateUser");
const matchPassword = require("../utils/matchPassword");
const {
  generateCode,
  sendVerificationCode,
} = require("../services/verificationService/emailVerification");
const tokenGenerator = require("../utils/tokenGenerator");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const { username, password, email } = req.body;

  let user = await getUser(username);
  if (user) return res.status(400).send("dublicate username!");

  const token = addUser(username, password, email);
  const verificationCode = generateCode(username);
  await sendVerificationCode(username, email, verificationCode);

  return res.status(201).send({ token });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("username and password are required");

  let user = await getUser(username);
  if (!user) return res.status(404).send("Invalid Credentials");

  if (!matchPassword(password, user.password))
    return res.status(404).send("Invalid Credentials");

  const token = tokenGenerator({
    _id: user._id,
    username: user.username,
    email: user.email,
  });

  return res.status(200).send({ token });
});

module.exports = router;
