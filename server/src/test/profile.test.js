const supertest = require("supertest");
const User = require("../models/User");
const app = require("../app");
const request = supertest(app);

var commonHeaders = {
  Authorization: "",
};

describe("Profile", () => {
  require("./auth.test");
  describe("getprofile", () => {
    test("Get user profile", async () => {
      const res = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      commonHeaders.Authorization = res.body.token;
      const response = await request
        .get("/profile/")
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(200);
    });
  });
  describe("updateprofileRec", () => {
    test("Update user profile", async () => {
      const response = await request
        .put("/profile/")
        .send({ location: "Hisar" })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(200);
    });
  });
  describe("updateprofile SEARCHER", () => {
    test("Update user profile", async () => {
      const res = await request.post("/auth/login").send({
        email: "email1",
        password: "password",
      });
      commonHeaders.Authorization = res.body.token;
      const response = await request
        .put("/profile/")
        .send({ location: "Hisar" })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(200);
    });
  });
  describe("error updateprofile SEARCHER", () => {
    test("error Update user profile", async () => {
      const response = await request
        .put("/profile/")
        .send({ user: "hi" })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(500);
    });
  });
  describe("error updateprofile RECRUITER", () => {
    test("error Update user profile", async () => {
      const res = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      commonHeaders.Authorization = res.body.token;
      const response = await request
        .put("/profile/")
        .send({ user: "hi" })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(500);
    });
  });
});
