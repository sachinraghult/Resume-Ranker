const supertest = require("supertest");
const User = require("../models/User");
const Application = require("../models/Application");
const app = require("../app");
const request = supertest(app);
const File = require("../models/File");
const json = require("JSON");

var commonHeaders = {
  Authorization: "",
};
var commondata = {
  PostId: "",
  AppId: "",
  AppId1: "",
};

describe("JobSpecificDashboard", () => {
  require("./auth.test");
  describe("Setting preprocessed data", () => {
    test("should return 200", async () => {
      const us = await request.post("/auth/register").send({
        name: "name",
        email: "email3",
        password: "password",
        type: "SEARCHER",
      });

      const res = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });

      commonHeaders.Authorization = res.body.token;
      const user = await User.find({ email: "email2" });
      const response = await request
        .post("/post/")
        .send({
          user: user._id,
          title: "Software",
          desc: "Hello there",
          exp: "Hi there what are you doing",
          keywords: [{ keyword: "First" }],
          skills: [{ skill: "C++", value: 40 }],
          deadline: new Date("2025-08-20T00:00:00.000+00:00"),
          email: "email2",
        })
        .set("Authorization", commonHeaders.Authorization);
      commondata.PostId = response.body._id;
      const resp = await request.post("/auth/login").send({
        email: "email1",
        password: "password",
      });
      commonHeaders.Authorization = resp.body.token;

      const fileDoc = new File({
        owner: resp.body.profile._id,
        key: "abcd",
        name: "abcd",
        url: "abcd",
      });

      await fileDoc.save();
      const respons = await request
        .post(`/post/${commondata.PostId}/apply`)
        .send({
          resumeId: fileDoc._id,
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(respons.status).toBe(201);

      commondata.AppId = respons.body._id;

      const resp2 = await request.post("/auth/login").send({
        email: "email3",
        password: "password",
      });
      commonHeaders.Authorization = resp2.body.token;

      const fileDoc2 = new File({
        owner: resp.body.profile._id,
        key: "abcd",
        name: "abcd",
        url: "abcd",
      });

      await fileDoc2.save();
      const respons2 = await request
        .post(`/post/${commondata.PostId}/apply`)
        .send({
          resumeId: fileDoc2._id,
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(respons2.status).toBe(201);

      commondata.AppId1 = respons2.body._id;
    });
  });
  describe("normalization", () => {
    test("should retrun 200", async () => {
      const upd = await request
        .put(`/application/${commondata.AppId1}`)
        .send({
          preprocessing_data: json.stringify({
            skills: ["c++", "python"],
            scores: [1, 1, 1, 1, 1, 1, 1],
          }),
        })
        .set("Authorization", commonHeaders.Authorization);
      const p = await Application.find();
      console.log(p);
      const res = await request.post(`/normaliser/`).send({ applications: p });
      expect(res.status).toBe(200);
    });
  });
  describe("normalization", () => {
    test("should retrun 200", async () => {
      const resp = await request.post("/auth/login").send({
        email: "email1",
        password: "password",
      });
      commonHeaders.Authorization = resp.body.token;
      const upd = await request
        .put(`/application/${commondata.AppId}`)
        .send({
          preprocessing_data: null,
        })
        .set("Authorization", commonHeaders.Authorization);
    });
  });
  describe("linegraph", () => {
    test("should retunr 200", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/linegraph/linegraph/${commondata.PostId}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("linegraph", () => {
    test("should retunr 500", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/linegraph/linegraph/laksohmoaen`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("barchart", () => {
    test("should retunr 200", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/barchart/barchart/${commondata.PostId}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("barchart", () => {
    test("should retunr 200", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/barchart/barchart/asekgoaeknb`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("post info", () => {
    test("should retunr 200", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/info/info/${commondata.PostId}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("post info", () => {
    test("should retunr 500", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/info/info/awbwbscxkw`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("table", () => {
    test("should retunr 200", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/table/table/${commondata.PostId}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("table", () => {
    test("should return 500", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/table/table/aeropeald`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("Maingraph", () => {
    test("should return 500", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/Maingraph/Maingraph/${commondata.PostId}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("jobSpecificDashboard", () => {
    test("should return 500", async () => {
      const res = await request
        .get(`/jobSpecificDashboard/Maingraph/Maingraph/abcd`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
});
