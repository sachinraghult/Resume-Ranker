const supertest = require("supertest");
const User = require("../models/User");
const app = require("../app");
const request = supertest(app);
const File = require("../models/File");

var commonHeaders = {
  Authorization: "",
};

describe("upload", () => {
  require("./auth.test");
  describe("upload", () => {
    test("upload", async () => {
      const res = await request.post("/auth/login").send({
        email: "email1",
        password: "password",
      });
      commonHeaders.Authorization = res.body.token;

      const fileDoc = new File({
        owner: res.body.profile._id,
        key: "abcd",
        name: "abcd",
        url: "abcd",
      });

      await fileDoc.save();

      const response = await request.get("/utils/upload").send().set({
        "Content-Type": "multipart/form-data",
        Authorization: commonHeaders.Authorization,
      });
      expect(response.status).toBe(404);
    });
  });
});
