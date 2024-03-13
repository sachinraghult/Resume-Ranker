const supertest = require("supertest");
const User = require("../models/User");
const app = require("../app");
const request = supertest(app);

var commonHeaders = {
  Authorization: "",
};

describe("User", () => {
  require("./auth.test");
  describe("getuser", () => {
    test("Get user to set state", async () => {
      const res = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      commonHeaders.Authorization = res.body.token;
      const user = await User.find({ email: "email2" });
      const response = await request
        .get("/user/")
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(200);
    });
  });
});
