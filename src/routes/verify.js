const express = require("express");

const auth = require("../middleware/auth");
const tokenGenerator = require("../utils/tokenGenerator");

const { verifyUser } = require("../database/users");
const {
  deleteCode,
  isValidCode,
} = require("../services/verificationService/emailVerification");

const router = express.Router();

//Verify User
router.get("/:code", [auth], async (req, res) => {
  const code = req.params.code;
  const username = req.user.username;

  const codeFromDB = await isValidCode(username, code);
  if (!codeFromDB) return res.status(404).send("code not found");

  verifyUser(username);
  deleteCode(code);

  const newToken = tokenGenerator({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    isVerified: true,
  });

  return res.send({ token: newToken });
});

module.exports = router;
