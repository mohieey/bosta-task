const app = require("./app");
const { PORT, MongoConnectionString } = require("./env");

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
