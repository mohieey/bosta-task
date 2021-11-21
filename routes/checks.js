const express = require("express");

const auth = require("../middleware/auth");

const {
  addCheck,
  getCheck,
  deleteCheck,
  getAllChecks,
  updateCheck,
} = require("../database/checks");
const validateCheck = require("../utils/validateCheck");

const { startMonitoring, stopMonitoring } = require("../utils/monitor");

const router = express.Router();

router.post("/stop/:id", [auth], (req, res) => {
  stopMonitoring(req.params.id);
  res.send("stopped");
});

router.post("/start/:id", [auth], (req, res) => {
  const check = getCheck(req.user.username, req.params.id);
  if (!check) return res.send("invalid check");

  startMonitoring(check);

  res.send("started");
});

router.delete("/:id", [auth], (req, res) => {
  const deletedCheck = deleteCheck(req.user.username, req.params.id);

  if (!deletedCheck) return res.send("invalid check");

  stopMonitoring(req.params.id);

  res.send("deleted");
});

router.put("/:id", [auth], (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const updatedCheck = updateCheck(req.user.username, req.params.id, req.body);

  if (!updatedCheck) return res.send("invalid check");

  res.send(updatedCheck);
});

router.post("/", [auth], (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCheck = addCheck(req.user.username, req.body);
  startMonitoring(newCheck);

  return res.send(newCheck);
});

router.get("/", (req, res) => {
  res.send(getAllChecks());
});

module.exports = router;
