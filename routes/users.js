const express = require("express");

const { addUser, getUser, validateUser } = require("../database/users");

const router = express.Router();

router.post("/", (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const { username, password, email } = req.body;

  const token = addUser(username, password, email);

  return res.send(token);
});

module.exports = router;
