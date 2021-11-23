const express = require("express");
const mongoose = require("mongoose");
const { PORT, MongoConnectionString } = require("./env");
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

app.get("/", (req, res) => {
  throw new Error("");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);

  console.log("Connecting to Database........");
  mongoose
    .connect(MongoConnectionString)
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => {
      console.log("Please provide a MongoDb connection string, and run again.");
      process.exit();
    });
});
