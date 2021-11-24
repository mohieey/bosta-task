require("./mongooseINIT");
const express = require("express");
//Routes
const users = require("./routes/users");
const verify = require("./routes/verify");
const checks = require("./routes/checks");
const reports = require("./routes/reports");

const app = express();
app.use(express.json());

app.use("/api/", users);
app.use("/api/verify", verify);
app.use("/api/check", checks);
app.use("/api/report", reports);

module.exports = app;
