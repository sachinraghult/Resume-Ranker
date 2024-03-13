const supertest = require("supertest");
const User = require("../models/User");
const app = require("../app");
const request = supertest(app);

var commonHeaders = {
  Authorization: "",
};

describe("Auth", () => {
  describe("POST /auth/register", () => {
    test("should return a 200 response for searcher", async () => {
      const response = await request.post("/auth/register").send({
        name: "name",
        email: "email1",
        password: "password",
        type: "SEARCHER",
      });
      expect(response.status).toBe(201);
    });

    test("should return a 200 response for recruiter", async () => {
      const response = await request.post("/auth/register").send({
        name: "name",
        email: "email2",
        password: "password",
        type: "RECRUITER",
      });
      expect(response.status).toBe(201);
    });

    test("should return a 400 response for email missing", async () => {
      const response = await request.post("/auth/register").send({
        name: "name",
        password: "password",
        type: "SEARCHER",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    test("should return a 200 response", async () => {
      const response = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      commonHeaders.Authorization = response.body.token;
      expect(response.status).toBe(200);
    });

    test("should return a 500 response for email missing", async () => {
      const response = await request.post("/auth/login").send({
        password: "password",
      });
      expect(response.status).toBe(500);
    });
  });

  describe("POST /auth/logout", () => {
    test("should return a 200 response", async () => {
      const response = await request
        .post("/auth/logout")
        .set(commonHeaders)
        .send({});
      expect(response.status).toBe(204);
    });

    test("should return a 500 response for missing header", async () => {
      const response = await request.post("/auth/register").send({});
      expect(response.status).toBe(400);
    });
  });
});
