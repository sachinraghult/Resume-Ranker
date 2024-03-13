const supertest = require("supertest");
const User = require("../models/User");
const app = require("../app");
const request = supertest(app);
const File = require("../models/File");
const json = require("JSON");

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
  postId3: "",
  appId1: "",
  appId2: "",
  appId3: "",
};

//prerequisite data used in tests
let ser1login,
  rec1login,
  post1,
  post2,
  post3,
  fileDoc1,
  fileDoc2,
  fileDoc3,
  application1,
  application2,
  application3;

describe("Applications", () => {
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

    test("Creating post 3 by recruiter 1", async () => {
      post3 = await request
        .post("/post/")
        .send({
          user: rec1login.body.profile._id,
          title: "ccc",
          desc: "ccc",
          exp: "ccc",
          keywords: [{ keyword: "java" }],
          skills: [{ skill: "java", value: 40 }],
          deadline: new Date("2025-08-20T00:00:00.000+00:00"),
          email: "ccc",
        })
        .set("Authorization", rec1header.Authorization);
      commondata.postId3 = post3.body._id;
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
      commondata.appId1 = application1.body._id;
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
          name: "yyy",
          resumeId: fileDoc2._id,
        })
        .set("Authorization", ser1header.Authorization);
      commondata.appId2 = application2.body._id;
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
      commondata.appId3 = application3.body._id;
    });
  });

  //testing applications
  describe("testing applications", () => {
    describe("getApplicationById", () => {
      test("should return 200", async () => {
        const response = await request
          .get(`/application/${commondata.appId1}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .get(`/application/${commondata.appId}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("getApplicationByUserAndPost", () => {
      test("should return 200", async () => {
        const response = await request
          .get(`/application/post/${commondata.postId1}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .get(`/application/post/${commondata.postId}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("getUserApplications", () => {
      test("should return 200", async () => {
        const response = await request
          .get("/application/")
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
    });

    describe("getRecruiterApplications", () => {
      test("should return 200", async () => {
        const response = await request
          .get("/application/recruiter/recruiter")
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
    });

    describe("checkApplicationForThePostByTheUser", () => {
      test("should return 200", async () => {
        const response = await request
          .get(`/application/check/${commondata.postId1}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .get(`/application/check/${commondata.postId}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("getResume", () => {
      test("should return 200", async () => {
        const response = await request
          .get(`/application/resume/${commondata.postId1}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .get(`/application/resume/${commondata.postId}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("get the ranking", () => {
      test("without preprocessing data should return 200", async () => {
        const response = await request
          .get(`/application/ranking/${commondata.postId1}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("prerequisite for preprocessing data", async () => {
        const response = await request
          .put(`/application/${commondata.appId1}`)
          .send({
            preprocessing_data: json.stringify({
              scores: [1, 1, 1, 1, 1, 1, 1],
            }),
          })
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("with preprocessing data should return 200", async () => {
        const response = await request
          .get(`/application/ranking/${commondata.postId1}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("with preprocessing data should return 500", async () => {
        const response = await request
          .get(`/application/ranking/${commondata.postId}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("getPreprocessApplication", () => {
      test("should return 200", async () => {
        const response = await request
          .get(`/application/preprocess/${commondata.appId1}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .get(`/application/preprocess/${commondata.appId}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("getPreprocessedProfileDetails", () => {
      test("should return 200", async () => {
        const response = await request
          .get(`/application/user/${commondata.appId1}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .get(`/application/user/${commondata.appId}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("searchApplications", () => {
      test("should return 200", async () => {
        const response = await request
          .post("/application/searchbox")
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
    });

    describe("updateApplication", () => {
      test("should retrun 200", async () => {
        const response = await request
          .put(`/application/${commondata.appId1}`)
          .send({
            preprocessing_data: json.stringify({
              scores: [1, 1, 1, 1, 1, 1, 1],
            }),
          })
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should retrun 500", async () => {
        const response = await request
          .put(`/application/${commondata.appId}`)
          .send({
            preprocessing_data: json.stringify({
              scores: [1, 1, 1, 1, 1, 1, 1],
            }),
          })
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("updateApplicationStatus", () => {
      test("should return 200", async () => {
        const response = await request
          .put(`/application/status/${commondata.appId1}`)
          .send({
            status: "Accepted",
          })
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(200);
      });
      test("should return 500", async () => {
        const response = await request
          .put(`/application/status/${commondata.appId}`)
          .send({
            status: "Accepted",
          })
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(500);
      });
    });

    describe("deleteApplication", () => {
      test("should return 204", async () => {
        const response = await request
          .delete(`/application/${commondata.appId1}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(204);
      });
      test("should return 500", async () => {
        const response = await request
          .delete(`/application/${commondata.appId}`)
          .set("Authorization", ser1header.Authorization);
        expect(response.status).toBe(500);
      });
      //failing accessControl case for coverage
      test("accessControl should return 403", async () => {
        const response = await request
          .delete(`/application/${commondata.appId}`)
          .set("Authorization", rec1header.Authorization);
        expect(response.status).toBe(403);
      });
    });
  });
});
