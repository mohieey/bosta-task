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

describe("Testing single check report", () => {
  it("should return 401 status code if no token provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    await request(app)
      .get("/api/report/" + checkForUser1._id)
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
      .get("/api/report/" + checkForUser1._id)
      .set("token", tokenForUser2)
      .expect(404);
  });

  it("should return 400 status code if check id is invalid objectId", async () => {
    const [u1] = await utils.generateDummyUsers();

    const tokenForUser1 = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    await request(app)
      .get("/api/report/" + "urhgrgher")
      .set("token", tokenForUser1)
      .expect(400);
  });

  it("should return 200 status code and the report with the correct check name", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    const tokenForUser1 = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    const res = await request(app)
      .get("/api/report/" + checkForUser1._id)
      .set("token", tokenForUser1)
      .expect(200);
    expect(res.body.name).toBe(checkForUser1.name);
  });
});
