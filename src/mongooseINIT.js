const mongoose = require("mongoose");
const { MongoConnectionString } = require("./env");
const { recoverFromOutages } = require("./services/MonitoringService/monitor");
const Check = require("./models/check");

console.log("Connecting to Database........", MongoConnectionString);
mongoose
  .connect(MongoConnectionString)
  .then(() => {
    console.log(`Connected to MongoDB on ${MongoConnectionString}`);
    return Check.find({ running: true });
  })
  .then((runningChecks) => {
    recoverFromOutages(runningChecks);
  })
  .catch(() => {
    console.log("Please provide a MongoDb connection string, and run again.");
    process.exit();
  });

module.exports = mongoose;
