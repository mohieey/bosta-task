const mongoose = require("mongoose");
const app = require("./app");
const { PORT, MongoConnectionString } = require("./env");

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
