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

describe("Landing Dashboard", () => {
  require("./auth.test");

  //prerequisite for all tests
  describe("Prerequisite for Landing Dashboard", () => {
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

  //tests for landing dashboard
  describe("Testing for Landing Dashboard", () => {
    //testing bargraph 1
    describe("bargraph1", () => {
      test("should return a 200 response ", async () => {
        const bargraph1 = await request
          .get("/landingDashboard/bargraph/bargraph")
          .set("Authorization", rec1header.Authorization);
        expect(bargraph1.status).toBe(200);
      });
    });

    //testing bargraph 2
    describe("bargraph2", () => {
      test("should return a 200 response ", async () => {
        const bargraph2 = await request
          .get("/landingDashboard/highest/lowest")
          .set("Authorization", rec1header.Authorization);
        expect(bargraph2.status).toBe(200);
      });
    });

    //testing cards
    describe("cards", () => {
      test("should return a 200 response ", async () => {
        const cards = await request
          .get("/landingDashboard/cards")
          .set("Authorization", rec1header.Authorization);
        expect(cards.status).toBe(200);
      });
    });

    //testing recent table
    describe("recent table", () => {
      test("should return a 200 response ", async () => {
        const recentTable = await request
          .get("/landingDashboard/recentTable/recentTable")
          .set("Authorization", rec1header.Authorization);
        expect(recentTable.status).toBe(200);
      });
    });

    //testing piechart
    describe("piechart", () => {
      //without preprocessing data
      describe("without preprocessing data", () => {
        test("should return a 200 response ", async () => {
          const piechart = await request
            .post("/landingDashboard/piechart/piechart")
            .send({
              skill: "C++",
            })
            .set("Authorization", rec1header.Authorization);
          expect(piechart.status).toBe(200);
        });
      });

      //prerequisite for preprocessing data
      describe("prerequisite for adding preprocessing data", () => {
        test("update application 1 with preprocessing data", async () => {
          const updatedPost1 = await request
            .put(`/application/${commondata.appId1}`)
            .send({
              preprocessing_data: json.stringify({
                score: [1, 1, 1, 1, 1, 1, 1],
              }),
            })
            .set("Authorization", ser1header.Authorization);
        });
      });

      //with preprocessing data
      describe("with preprocessing data", () => {
        test("should return a 200 response ", async () => {
          const piechart = await request
            .post("/landingDashboard/piechart/piechart")
            .send({
              skill: "C++",
            })
            .set("Authorization", rec1header.Authorization);
          expect(piechart.status).toBe(200);
        });
      });
    });
  });
});
