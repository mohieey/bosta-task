const express = require("express");

const auth = require("../middleware/auth");
const validateIdInQueryParams = require("../middleware/validateIdInQueryParams");

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

  return res.status(201).send(newCheck);
});

//Delete a check
router.delete("/:id", [auth, validateIdInQueryParams], async (req, res) => {
  const deletedCheck = await deleteCheck(req.user._id, req.params.id);
  console.log(deletedCheck);
  if (!deletedCheck) return res.status(404).send("invalid check");

  stopMonitoring(req.params.id + req.user._id);

  return res.status(204).send("deleted");
});

//Update a check
router.put("/:id", [auth, validateIdInQueryParams], async (req, res) => {
  const result = validateCheck(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const updatedCheck = await updateCheck(req.user._id, req.params.id, req.body);

  if (!updatedCheck) return res.status(404).send("invalid check");

  return res.status(201).send("updated");
});

//Get a specific check
router.get("/:id", [auth, validateIdInQueryParams], async (req, res) => {
  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.status(404).send("not found");

  return res.status(200).send(check);
});

//Get all checks
router.get("/", [auth], async (req, res) => {
  return res.status(200).send(await getAllChecks(req.user._id));
});

//Stop Monitoring
router.get("/stop/:id", [auth, validateIdInQueryParams], (req, res) => {
  const result = stopMonitoring(req.params.id + req.user._id);
  if (!result) return res.status(404).send("not found");

  return res.status(204).send("stopped");
});

//Start Monitoring
router.get("/start/:id", [auth, validateIdInQueryParams], async (req, res) => {
  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.status(404).send("not found");

  startMonitoring(check);

  return res.status(204).send("started");
});

module.exports = router;
