module.exports.PORT = process.env.PORT || 3000;
module.exports.MongoConnectionString =
  process.env.MongoConnectionString ||
  "mongodb://monitorbotDB:27017/monitorbot";
module.exports.SALT = process.env.SALT || "euriostghoiuerhftg";
module.exports.JWTPrivateKey =
  process.env.JWTPrivateKey || "ieruhfuiegfoiwuefgiewgfr";
module.exports.fromMail = process.env.fromMail || "dummy@dummy.com";
module.exports.mailKey = process.env.mailKey || "dummdyKey";
