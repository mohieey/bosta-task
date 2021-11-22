const fs = require("fs");
const express = require("express");

const auth = require("../middleware/auth");

const {
  addCheck,
  getCheck,
  deleteCheck,
  getAllChecks,
  updateCheck,
} = require("../database/checks");

const generateReportByCheck = require("../utils/generateReportByCheck");

const router = express.Router();

router.get("/:id", [auth], async (req, res) => {
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

module.exports = router;
