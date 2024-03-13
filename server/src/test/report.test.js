const supertest = require("supertest");
const json = require("JSON");

const User = require("../models/User");
const Post = require("../models/Post");
const Application = require("../models/Application");
const File = require("../models/File");
const app = require("../app");

const request = supertest(app);

//headers with auth token
var dummyheader = {
  Authorization: "",
};
var ser1header = {
  Authorization: "",
};
var rec1header = {
  Authorization: "",
};

//common data used in tests
var commondata = {
  postId1: "",
  postId2: "",
  appId1: "",
  appId2: "",
  appId3: "",
};

//prerequisite data used in tests
let ser1login,
  rec1login,
  post1,
  post2,
  fileDoc1,
  fileDoc2,
  fileDoc3,
  application1,
  application2,
  application3;

describe("Report", () => {
  require("./auth.test");

  //prerequisite for all tests
  describe("Prerequisite for Report", () => {
    //logging in
    test("Logging in searcher 1", async () => {
      ser1login = await request.post("/auth/login").send({
        email: "email1",
        password: "password",
      });
      ser1header.Authorization = ser1login.body.token;
    });
    test("Logging in recruiter 1", async () => {
      rec1login = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      rec1header.Authorization = rec1login.body.token;
    });

    //creating post
    test("Creating post 1 by recruiter 1", async () => {
      post1 = await request
        .post("/post/")
        .send({
          user: rec1login.body.profile._id,
          title: "aaa",
          desc: "aaa",
          exp: "aaa",
          keywords: [{ keyword: "C++" }],
          skills: [{ skill: "C++", value: 40 }],
          deadline: new Date("2025-08-20T00:00:00.000+00:00"),
          email: "aaa",
        })
        .set("Authorization", rec1header.Authorization);
      commondata.postId1 = post1.body._id;
    });
    test("Creating post 2 by recruiter 1", async () => {
      post2 = await request
        .post("/post/")
        .send({
          user: rec1login.body.profile._id,
          title: "bbb",
          desc: "bbb",
          exp: "bbb",
          keywords: [{ keyword: "python" }],
          skills: [{ skill: "python", value: 40 }],
          deadline: new Date("2025-08-20T00:00:00.000+00:00"),
          email: "bbb",
        })
        .set("Authorization", rec1header.Authorization);
      commondata.postId2 = post2.body._id;
    });

    //creating application
    test("Creating application 1 for post 1 by searcher 1", async () => {
      fileDoc1 = new File({
        owner: ser1login.body.profile._id,
        key: "xxx",
        name: "xxx",
        url: "xxx",
      });

      await fileDoc1.save();
      application1 = await request
        .post(`/post/${commondata.postId1}/apply`)
        .send({
          resumeId: fileDoc1._id,
        })
        .set("Authorization", ser1header.Authorization);
    });
    test("Creating application 2 for post 1 by searcher 1", async () => {
      fileDoc2 = new File({
        owner: ser1login.body.profile._id,
        key: "yyy",
        name: "yyy",
        url: "yyy",
      });

      await fileDoc2.save();
      application2 = await request
        .post(`/post/${commondata.postId1}/apply`)
        .send({
          resumeId: fileDoc2._id,
        })
        .set("Authorization", ser1header.Authorization);
    });
    test("Creating application 1 for post 2 by searcher 1", async () => {
      fileDoc3 = new File({
        owner: ser1login.body.profile._id,
        key: "zzz",
        name: "zzz",
        url: "zzz",
      });

      await fileDoc3.save();
      application3 = await request
        .post(`/post/${commondata.postId2}/apply`)
        .send({
          resumeId: fileDoc3._id,
        })
        .set("Authorization", ser1header.Authorization);
    });
  });

  //tests for report
  describe("Testing for Report", () => {
    //testing search box
    describe("search box filter in report generation", () => {
      describe("filter using title", () => {
        test("should return a 200 response ", async () => {
          const searchTitle = await request
            .post("/report/searchbox")
            .send({
              search: "a",
              type: "Filter job posts report based on Title",
            })
            .set("Authorization", rec1header.Authorization);
          expect(searchTitle.status).toBe(200);
        });
      });
      describe("filter using skill", () => {
        test("should return a 200 response ", async () => {
          const searchSkill = await request
            .post("/report/searchbox")
            .send({
              search: "C",
              type: "Filter job posts report based on Skills",
            })
            .set("Authorization", rec1header.Authorization);
          expect(searchSkill.status).toBe(200);
        });
      });
    });

    //testing report generation
    describe("search box filter in report generation", () => {
      describe("get report generation", () => {
        describe("job specific", () => {
          test("should return a 200 response ", async () => {
            const jobSpecific = await request
              .post("/report/filter")
              .send({
                type: "Specific posts reports",
              })
              .set("Authorization", rec1header.Authorization);
            expect(jobSpecific.status).toBe(200);
          });
        });
        describe("based on title", () => {
          test("should return a 200 response ", async () => {
            const title = await request
              .post("/report/filter")
              .send({
                search: "a",
                type: "Filter job posts report based on Title",
              })
              .set("Authorization", rec1header.Authorization);
            expect(title.status).toBe(200);
          });
        });
        describe("based on active job posts", () => {
          test("should return a 200 response ", async () => {
            const active = await request
              .post("/report/filter")
              .send({
                type: "Active job posts report",
              })
              .set("Authorization", rec1header.Authorization);
            expect(active.status).toBe(200);
          });
        });
        describe("based on time frame", () => {
          test("should return a 200 response ", async () => {
            const timeFrame = await request
              .post("/report/filter")
              .send({
                startDate: new Date("2022-08-20T00:00:00.000+00:00"),
                endDate: new Date("2030-08-20T00:00:00.000+00:00"),
                type: "Job posts report between a Time frame",
              })
              .set("Authorization", rec1header.Authorization);
            expect(timeFrame.status).toBe(200);
          });
        });
        describe("based on skill", () => {
          test("should return a 200 response ", async () => {
            const skill = await request
              .post("/report/filter")
              .send({
                search: "C",
                type: "Filter job posts report based on Skills",
              })
              .set("Authorization", rec1header.Authorization);
            expect(skill.status).toBe(200);
          });
          test("should return a 500 response ", async () => {
            const skill = await request
              .post("/report/filter")
              .send({
                type: "Filter job posts report based on Skills",
              })
              .set("Authorization", rec1header.Authorization);
            expect(skill.status).toBe(500);
          });
        });
      });
    });
  });
});
