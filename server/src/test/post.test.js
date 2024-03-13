const supertest = require("supertest");
const app = require("../app");
const User = require("../models/User");
const File = require("../models/File");
const request = supertest(app);

var commonHeaders = {
  Authorization: "",
};
var commondata = {
  PostId: "",
};
describe("Post", () => {
  require("./auth.test");
  describe("Post /createjob", () => {
    test("should return a 200 response for recruiter", async () => {
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
          deadline: new Date(),
          email: "email2",
        })
        .set("Authorization", commonHeaders.Authorization);
      commondata.PostId = response.body._id;
      expect(response.status).toBe(201);
    });
  });

  describe("Post /createjobfaliure", () => {
    test("should return a 500 response for recruiter", async () => {
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
          deadline: new Date(),
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(500);
    });
  });

  describe("PUT /updatejob", () => {
    test("should return a 200 response for recruiter", async () => {
      const user = await User.find({ email: "email2" });
      const response = await request
        .put("/post/")
        .send({
          desc: "hi there",
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(200);
    });
  });
  describe("error PUT /updatejob", () => {
    test("should return a 500 response for recruiter", async () => {
      const user = await User.find({ email: "email2" });
      const response = await request
        .put("/post/")
        .send({
          applicationId: ["hi", 123],
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(500);
    });
  });

  describe("Apply to job post", () => {
    test("should return a 200 response for searcher", async () => {
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
      const response = await request
        .post(`/post/${commondata.PostId}/apply`)
        .send({
          resumeId: fileDoc._id,
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(201);
    });
    test("should return a 400 response for searcher", async () => {
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
      const response = await request
        .post(`/post/${commondata.PostId}/apply`)
        .send({
          resumeId: fileDoc._id,
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(400);
    });
    test("should return a 500 response for searcher", async () => {
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
      const response = await request
        .post(`/post/${commondata.PostId1}/apply`)
        .send({
          resumeId: fileDoc._id,
        })
        .set("Authorization", commonHeaders.Authorization);
      expect(response.status).toBe(500);
    });
  });
  describe("get job post by Id", () => {
    test("should return a 200 response ", async () => {
      const res = await request
        .get(`/post/${commondata.PostId}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
    test("should return a 500 response ", async () => {
      const res = await request
        .get(`/post/${commondata.PostId1}`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("get job post of a user", () => {
    test("should return a 200 response ", async () => {
      const response = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      const res = await request
        .get("/post//myJobs/myJobs")
        .set("Authorization", response.body.token);
      expect(res.status).toBe(200);
    });
  });
  describe("get all job posts", () => {
    test("should return a 200 response ", async () => {
      const res = await request
        .get("/post/")
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("get bookmarked job posts", () => {
    test("when no bookmarks should return a 200 response ", async () => {
      const res = await request
        .get("/post/bookmark")
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });
  describe("handle bookmark for a job post", () => {
    test("for adding bookmark should return a 200 response ", async () => {
      const res = await request
        .put(`/post/bookmark/${commondata.PostId}`)
        .send()
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
    describe("get bookmarked job posts", () => {
      test("when there are bookmarks should return a 200 response ", async () => {
        const res = await request
          .get("/post/bookmark")
          .set("Authorization", commonHeaders.Authorization);
        expect(res.status).toBe(200);
      });
    });
    test("for removing boookmark should return a 200 response ", async () => {
      const res = await request
        .put(`/post/bookmark/${commondata.PostId}`)
        .send()
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
    test("should return a 500 response ", async () => {
      const res = await request
        .put(`/post/bookmark/${commondata.PostId1}`)
        .send()
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("check if applied", () => {
    test("if applied should return a 200 response ", async () => {
      const res = await request
        .get(`/post/${commondata.PostId}/check`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });

    test("should return a 500 response ", async () => {
      const res = await request
        .get(`/post/${commondata.PostId1}/check`)
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(500);
    });
  });
  describe("post with status for searcher", () => {
    test("should return a 200 response ", async () => {
      const res = await request
        .get("/post/jobFeed/jobFeed")
        .set("Authorization", commonHeaders.Authorization);
      expect(res.status).toBe(200);
    });
  });

  describe("delete a post", () => {
    test("should return a 204 response ", async () => {
      const response = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      const res = await request
        .delete(`/post/${commondata.PostId}`)
        .set("Authorization", response.body.token);
      expect(res.status).toBe(204);
    });
    test("should return a 500 response ", async () => {
      const response = await request.post("/auth/login").send({
        email: "email2",
        password: "password",
      });
      const res = await request
        .delete(`/post/${commondata.PostId1}`)
        .set("Authorization", response.body.token);
      expect(res.status).toBe(500);
    });
  });
});
