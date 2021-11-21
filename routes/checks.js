const express = require("express");

const auth = require("../middleware/auth");

const { addCheck, getCheck, validateCheck } = require("../database/checks");
const { startMonitoring, stopMonitoring } = require("../utils/monitor");

const router = express.Router();

router.post("/stop/:id", (req, res) => {
  stopMonitoring(req.params.id);
  res.send("stopped");
});

router.post("/", [auth], (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCheck = addCheck(req.user.username, req.body);
  if (!newCheck) return res.send("already used check name");
  startMonitoring(newCheck);

  return res.send(newCheck);
});

router.get("/", (req, res) => {
  res.send(getCheck());
});

module.exports = router;
