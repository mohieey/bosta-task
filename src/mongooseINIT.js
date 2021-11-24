const mongoose = require("mongoose");
const { MongoConnectionString } = require("./env");
console.log("Connecting to Database........", MongoConnectionString);
mongoose
  .connect(MongoConnectionString)
  .then(() => console.log(`Connected to MongoDB on ${MongoConnectionString}`))
  .catch(() => {
    console.log("Please provide a MongoDb connection string, and run again.");
    process.exit();
  });

module.exports = mongoose;
