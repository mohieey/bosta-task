const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/user");
const hashPassword = require("../../src/utils/hashPassword");

// beforeEach(() => {
//   initializeCityDatabase();
// });

afterEach(async () => {
  await User.deleteMany();
});

describe("Testing the sign in route", () => {
  it("should return 400 status code if the username is not provided", async () => {
    await request(app)
      .post("/api/signin")
      .send({
        password: "sdfsdnmfjdf",
      })
      .expect(400);
  });

  it("should return 400 status code if the password is not provided", async () => {
    await request(app)
      .post("/api/signin")
      .send({
        username: "testUsername",
      })
      .expect(400);
  });

  it("should return 404 status code if the credentials is invalid", async () => {
    new User({
      username: "testUser",
      password: "testPassword",
      email: "test@test.com",
    }).save();

    const response = await request(app)
      .post("/api/signin")
      .send({
        username: "testUser",
        password: "wrongpassword",
      })
      .expect(404);
  });

  it("should return 200 status code if the credentials is valid", async () => {
    const password = "testPassword";
    const hashed = hashPassword(password);
    await new User({
      username: "testUser",
      password: hashed,
      email: "test@test.com",
    }).save();

    const res = await request(app)
      .post("/api/signin")
      .send({
        username: "testUser",
        password: "testPassword",
      })
      .expect(200);
    expect(res.body.token).not.toBe(null);
  });
});
