const User = require("../src/models/user");
const Check = require("../src/models/check");

module.exports.generateDummyUsers = async () => {
  const u1 = await new User({
    username: "testUser1",
    email: "test1@test.com",
    password: "testPassword",
  }).save();

  const u2 = await new User({
    username: "testUser2",
    email: "test1@test.com",
    password: "testPassword",
  }).save();

  return [u1, u2];
};

module.exports.dummyCheckData = {
  name: "updated",
  url: "wwww.google.com",
  protocol: "https",
  port: ":3001",
  webhook: "http://www.goo.com",
  timeout: "5000",
  interval: "10000",
  threshold: "9",
  httpHeaders: {},
  assert: { statusCode: 400 },
  tags: ["t3"],
  ignoreSSL: true,
};

module.exports.generateDummyCheck = async (userId) => {
  const check = await new Check({
    ...this.dummyCheckData,
    user: userId,
  }).save();

  return check;
};
