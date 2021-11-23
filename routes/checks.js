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

//Create a check
router.post("/", [auth], (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCheck = addCheck(req.user._id, {
    ...req.body,
    channels: { mail: [req.user.email] },
  });
  startMonitoring(newCheck);

  return res.send(newCheck);
});

//Delete a check
router.delete("/:id", [auth], async (req, res) => {
  const deletedCheck = await deleteCheck(req.user._id, req.params.id);

  if (!deletedCheck) return res.send("invalid check");

  stopMonitoring(req.params.id + req.user._id);

  res.send("deleted");
});

//Update a check
router.put("/:id", [auth], async (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const updatedCheck = await updateCheck(req.user._id, req.params.id, req.body);

  if (!updatedCheck) return res.send("invalid check");

  res.send("updated");
});

//Get a specific check
router.get("/:id", [auth], async (req, res) => {
  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.status(404).send("not found");

  res.send(check);
});

//Get all checks
router.get("/", [auth], async (req, res) => {
  res.send(await getAllChecks(req.user._id));
});

//Stop Monitoring
router.get("/stop/:id", [auth], (req, res) => {
  const result = stopMonitoring(req.params.id + req.user._id);
  if (!result) return res.send("invalid check");

  res.status(200).send("stopped");
});

//Start Monitoring
router.get("/start/:id", [auth], async (req, res) => {
  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.send("invalid check");

  startMonitoring(check);

  res.status(200).send("started");
});

module.exports = router;
