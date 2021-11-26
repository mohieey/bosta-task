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

describe("Testing creating check route", () => {
  it("should return 401 status code if no token provided", async () => {
    await request(app)
      .post("/api/check")
      .send(utils.dummyCheckData)
      .expect(401);
  });

  it("should return 400 status code if no check name provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const token = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .post("/api/check")
      .set("token", token)
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

  it("should return 400 status code if no check url provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const token = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .post("/api/check")
      .set("token", token)
      .send({
        name: "testname",
        // url: "wwww.google.com",
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

  it("should return 400 status code if no check protocol provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const token = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .post("/api/check")
      .set("token", token)
      .send({
        name: "testname",
        url: "wwww.google.com",
        // protocol: "https",
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

  it("should return 400 status code if a unexpected (not https,http or tcp) check protocol provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const token = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .post("/api/check")
      .set("token", token)
      .send({
        name: "testname",
        url: "wwww.google.com",
        protocol: "jfjf",
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

  it("should return 201 status code if all required check fields provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const token = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    const res = await request(app)
      .post("/api/check")
      .set("token", token)
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
      .expect(201);
    expect(res.body.name).toBe("testname");
    expect(res.body.user).toBe(u1.id);
  });
});
