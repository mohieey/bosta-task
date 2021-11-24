const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/user");
const Check = require("../../src/models/check");
const tokenGenerator = require("../../src/utils/tokenGenerator");
const utils = require("./utils");

afterEach(async () => {
  await User.deleteMany();
  await Check.deleteMany();
});

describe("Testing updateing check route", () => {
  it("should return 401 status code if no token provided", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    await request(app).get("/api/check").expect(401);
  });

  it("should return 200 status code if check is deleted", async () => {
    const [u1] = await utils.generateDummyUsers();
    const checkForUser1 = await utils.generateDummyCheck(u1._id);

    const tokenForUser1 = tokenGenerator({
      _id: u1._id,
      username: u1.username,
      email: u1.email,
    });

    res = await request(app)
      .get("/api/check")
      .set("token", tokenForUser1)
      .expect(200);
    expect(res.body.length).toEqual(1);
  });
});
