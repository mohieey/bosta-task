const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/user");
const Check = require("../../src/models/check");
const tokenGenerator = require("../../src/utils/tokenGenerator");
const utils = require("../utils");

afterEach(async () => {
  await User.deleteMany();
  await Check.deleteMany();
});

describe("Testing updateing check route", () => {
  it("should return 401 status code if no token provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    await request(app)
      .put(`/api/check/` + checkForUser1._id)
      .send(utils.dummyCheckData)
      .expect(401);
  });

  it("should return 404 status code if no check belongs to the user in token", async () => {
    const [u1, u2] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    const tokenForUser2 = tokenGenerator({
      _id: u2._id,
      username: u2.username,
      email: u2.email,
    });

    await request(app)
      .put("/api/check/" + checkForUser1._id)
      .set("token", tokenForUser2)
      .send({
        name: "testname",
        url: "wwww.google.com",
        protocol: "https",
        port: ":3001",
        webhook: "http://www.goo.com",
        timeout: "5000",
        interval: "20000",
        threshold: "9",
        httpHeaders: {},
        assert: { statusCode: 400 },
        tags: ["t3"],
        ignoreSSL: true,
      })
      .expect(404);
  });

  it("should return 400 status code if no check name provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    const tokenForUser1 = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .put("/api/check/" + checkForUser1._id)
      .set("token", tokenForUser1)
      .send({
        // name: "testname",
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
      })
      .expect(400);
  });

  it("should return 400 status code if check id is invalid objectId", async () => {
    const [u1] = await utils.generateDummyUsers();

    const tokenForUser1 = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .put("/api/check/" + "urhgrgher")
      .set("token", tokenForUser1)
      .send({
        name: "testname",
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
      })
      .expect(400);
  });

  it("should return 201 status code if the check is updated", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    const tokenForUser1 = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .put("/api/check/" + checkForUser1._id)
      .set("token", tokenForUser1)
      .send({
        name: "newname",
        url: "wwww.google.com",
        protocol: "https",
        port: ":3001",
        webhook: "http://www.goo.com",
        timeout: "10000",
        interval: "20000",
        threshold: "9",
        httpHeaders: {},
        assert: { statusCode: 400 },
        tags: ["t3"],
        ignoreSSL: true,
      })
      .expect(201);
  });
});
