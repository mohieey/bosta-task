const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const schema = Joi.object({
  id: Joi.objectId(),
});

const fs = require("fs");
const express = require("express");

const auth = require("../middleware/auth");

const { getCheck, getChecksByTag } = require("../database/checks");

const generateReportByCheck = require("../utils/generateReportByCheck");
const generateReportByTag = require("../utils/generateReportByTag");

const router = express.Router();

router.get("/:id", [auth], async (req, res) => {
  const result = schema.validate({ id: req.params.id });
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const check = await getCheck(req.user._id, req.params.id);
  if (!check) return res.status(404).send("not found");

  const report = generateReportByCheck(check);

  // convert JSON object to string
  const data = JSON.stringify(report);

  // write JSON string to a file
  fs.writeFile(`${check.id}___${new Date()}.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });

  return res.send(report);
});

router.get("/tag/:tag", [auth], async (req, res, next) => {
  const checks = await getChecksByTag(req.user._id, req.params.tag);
  if (!checks) return res.status(404).send("not found");

  const report = generateReportByTag(checks, req.params.tag);

  // // convert JSON object to string
  // const data = JSON.stringify(report);

  // // write JSON string to a file
  // fs.writeFile(`${check.id}___${new Date()}.json`, data, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("JSON data is saved.");
  // });

  return res.send(report);
});

module.exports = router;
