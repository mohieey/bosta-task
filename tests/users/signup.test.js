const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/user");

// beforeEach(() => {
//   initializeCityDatabase();
// });

afterEach(async () => {
  await User.deleteMany();
});

describe("Testing the sign up route", () => {
  it("should return 400 status code if the username is not provided", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        password: "sdfsdnmfjdf",
        email: "test@test.com",
      })
      .expect(400);
  });

  it("should return 400 status code if the username is less then 5 characters", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        username: "test",
        password: "sdfsdnmfjdf",
        email: "test@test.com",
      })
      .expect(400);
  });

  it("should return 400 status code if the email is not provided", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        username: "test",
        password: "sdfsdnmfjdf",
      })
      .expect(400);
  });

  it("should return 400 status code if the email is not correct", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        username: "test",
        password: "sdfsdnmfjdf",
        email: "dhydghfyg",
      })
      .expect(400);
  });

  it("should return 400 status code if the password is not provided", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        username: "test",
        email: "test@test.com",
      })
      .expect(400);
  });

  it("should return 400 status code if the password is less then 5 characters", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        username: "test",
        password: "jdf",
        email: "test@test.com",
      })
      .expect(400);
  });

  it("should return 201 status code if the user is created ", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({
        username: "testUser",
        password: "testPassword",
        email: "test@test.com",
      })
      .expect(201);

    expect(res.body.token).not.toBe(null);
  });

  it("should return 400 status code if the username is dublicated", async () => {
    await new User({
      username: "testUser",
      password: "testPassword",
      email: "test@test.com",
    }).save();

    await request(app)
      .post("/api/signup")
      .send({
        username: "testUser",
        password: "testPassword",
        email: "test@test.com",
      })
      .expect(400);
  });
});
