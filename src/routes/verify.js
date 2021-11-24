const express = require("express");

const auth = require("../middleware/auth");

const { verifyUser } = require("../database/users");
const {
  getUsernameToVerify,
  deleteCode,
} = require("../services/verificationService/emailVerification");

const router = express.Router();

//Verify User
router.get("/:code", [auth], (req, res) => {
  const code = req.params.code;
  const username = getUsernameToVerify(code);
  if (!username || username !== req.user.username)
    return res.send("Invalid code");

  verifyUser(username);
  deleteCode(code);

  return res.send("Verified!");
});

module.exports = router;
