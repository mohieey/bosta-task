const express = require("express");

const { addUser, getUser } = require("../database/users");
const validateUser = require("../utils/validateUser");
const matchPassword = require("../utils/matchPassword");
const {
  generateCode,
  sendVerificationCode,
} = require("../services/verificationService/emailVerification");
const tokenGenerator = require("../utils/tokenGenerator");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const { username, password, email } = req.body;

  let user = await getUser(username);
  if (user) return res.status(400).send("dublicate username!");

  const token = addUser(username, password, email);
  const code = generateCode(username);
  sendVerificationCode(username, email, code);

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
    isVerified: user.isVerified,
  });

  return res.status(200).send({ token });
});

router.get("/me", [auth], async (req, res) => {
  let user = await getUser(req.user.username);
  if (!user) return res.status(404).send("not found");
  res.send(user);
});

module.exports = router;
