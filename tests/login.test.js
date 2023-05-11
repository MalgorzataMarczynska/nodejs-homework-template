const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const uriDb = process.env.DB_HOST;

beforeEach(async () => {
  await mongoose.connect(uriDb);
});
afterEach(async () => {
  await mongoose.connection.close();
});
describe("POST /api/users/signup", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/api/users/signup").send({
      email: "allanback@retriver.com",
      password: "djcjue459cgy29?",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.newUser.email).toBe("allanback@retriver.com");
    expect(res.body.data.newUser.subscription).toBe("starter");
  });
});
describe("POST /api/users/login", () => {
  it("should log-in user and give a token", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "allanback@retriver.com",
      password: "djcjue459cgy29?",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.user.email).toBe("allanback@retriver.com");
    expect(res.body.data.user.subscription).toBe("starter");
    expect(res.body.data.token).toBeTruthy();
  });
});
