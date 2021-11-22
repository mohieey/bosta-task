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
  const result = stopMonitoring(req.params.id + req.user._id);
  if (!result) return res.send("invalid check");

  res.send("stopped");
});

router.post("/start/:id", [auth], async (req, res) => {
  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.send("invalid check");

  startMonitoring(check);

  res.send("started");
});

router.delete("/:id", [auth], async (req, res) => {
  const deletedCheck = await deleteCheck(req.user._id, req.params.id);

  if (!deletedCheck) return res.send("invalid check");

  stopMonitoring(req.params.id + req.user._id);

  res.send("deleted");
});

router.put("/:id", [auth], async (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const updatedCheck = await updateCheck(req.user._id, req.params.id, req.body);

  if (!updatedCheck) return res.send("invalid check");

  res.send("updated");
});

router.post("/", [auth], (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCheck = addCheck(req.user._id, req.body);
  startMonitoring(newCheck);

  return res.send(newCheck);
});

router.get("/", async (req, res) => {
  res.send(await getAllChecks());
});

module.exports = router;
