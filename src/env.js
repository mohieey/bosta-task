module.exports.PORT = process.env.PORT || 3002;
module.exports.MongoConnectionString =
  process.env.MongoConnectionString || "mongodb://localhost:27017/monitorbot";
module.exports.SALT = process.env.SALT || "euriostghoiuerhftg";
module.exports.JWTPrivateKey =
  process.env.JWTPrivateKey || "ieruhfuiegfoiwuefgiewgfr";
module.exports.fromMail = process.env.fromMail || "dummy@dummy.com";
module.exports.mailKey = process.env.mailKey || "dummyKey";
