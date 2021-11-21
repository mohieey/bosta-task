const express = require("express");

const auth = require("../middleware/auth");

const { addCheck, getCheck, validateCheck } = require("../database/checks");
const {
  generateCode,
  sendVerificationCode,
} = require("../utils/emailVerification");

const router = express.Router();

router.post("/", [auth], (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCheck = addCheck(req.user.username, req.body);

  return res.send(newCheck);
});

module.exports = router;
