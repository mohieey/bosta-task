const express = require("express");

const auth = require("../middleware/auth");
const validateIdInQueryParams = require("../middleware/validateIdInQueryParams");

const { getCheck, getChecksByTag } = require("../database/checks");

const generateReportByCheck = require("../utils/generateReportByCheck");
const generateReportByTag = require("../utils/generateReportByTag");

const router = express.Router();

router.get("/:id", [auth, validateIdInQueryParams], async (req, res) => {
  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.status(404).send("not found");

  const report = generateReportByCheck(check);

  return res.status(200).send(report);
});

router.get("/tag/:tag", [auth], async (req, res, next) => {
  const checks = await getChecksByTag(req.user._id, req.params.tag);
  if (checks.length === 0)
    return res.status(404).send("No Checks With This Tag");
  console.log(req.user._id);
  console.log(checks);
  const report = generateReportByTag(checks, req.params.tag);

  return res.status(200).send(report);
});

module.exports = router;
