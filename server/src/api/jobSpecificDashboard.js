const router = require("express").Router();
const json = require("JSON");

const axios = require("axios");
const config = require("../config");

const auth = require("../middleware/auth");

const User = require("../models/User");
const Searcher = require("../models/Searcher");
const Post = require("../models/Post");
const Application = require("../models/Application");
const File = require("../models/File");

//router for Barchart

router.get("/Maingraph/Maingraph/:id", auth, async (req, res) => {
  try {
    let posts = await Post.findById(req.params.id);
    let applications = await Application.find({ post: posts._id });

    let normaliser = await axios.post(`${config.SERVER_URL}/normaliser`, {
      applications,
    });

    let scores = [];
    await Promise.all(
      applications.map(async (application) => {
        if (application.preprocessing_data) {
          let normalisedScore = [];
          normaliser.data.map((normaliser) => {
            if (
              normaliser.application.toString() === application._id.toString()
            ) {
              normalisedScore.push(normaliser);
            }
          });
          scores.push(normalisedScore[0].scores[0] * 100);

          // preprocessed = json.parse(application.preprocessing_data);
          // scores.push(preprocessed.scores[0] * 100);
          // console.log(preprocessed.scores[0]);
          // console.log(scores);
        }
      })
    );
    return res.status(200).json(scores);
  } catch (err) {
    return res.status(500).json("Cannot get posts");
  }
});

router.get("/linegraph/linegraph/:id", auth, async (req, res) => {
  try {
    let posts = await Post.findById(req.params.id);
    let app = [0, 0, 0, 0];
    let applications = await Application.find({ post: posts._id });
    await Promise.all(
      applications.map(async (application) => {
        var date = application.createdAt;
        if (date >= new Date(new Date() - 7 * 60 * 60 * 24 * 1000)) {
          app[0]++;
        } else if (date >= new Date(new Date() - 14 * 60 * 60 * 24 * 1000)) {
          app[1]++;
        } else if (date >= new Date(new Date() - 21 * 60 * 60 * 24 * 1000)) {
          app[2]++;
        } else if (date >= new Date(new Date() - 30 * 60 * 60 * 24 * 1000)) {
          app[3]++;
        }
      })
    );

    console.log(app);
    return res.status(200).json(app);
  } catch (err) {
    return res.status(500).json("Cannot get posts");
  }
});

router.get("/barchart/barchart/:id", auth, async (req, res) => {
  try {
    let posts = await Post.findById(req.params.id);
    // console.log(posts.applications);
    let skill = [];
    let count = [];
    let d = 0;

    // console.log(posts.skills);
    posts.skills.map((sk) => {
      skill.push(sk.skill.toLowerCase());
      count.push(0);
    });

    let applications = await Application.find({ post: posts._id });

    applications.map((application) => {
      d++;
      if (application.preprocessing_data) {
        let preprocessed = json.parse(application.preprocessing_data);
        preprocessed.skills.map((pSkill) => {
          var index = skill.indexOf(pSkill.toLowerCase());
          count[index] = count[index] + 1;
        });
      }
    });

    return res.status(200).json({ skill, count, d });
  } catch (e) {
    return res.status(500).json("Cannot fetch");
  }
});

router.get("/info/info/:id", auth, async (req, res) => {
  try {
    let posts = await Post.findById(req.params.id);
    let arr = [];
    // console.log(posts.desc);

    let sk = posts.skills;
    let dt = posts.deadline;
    let ct = posts.createdAt;
    let mt = posts.updatedAt;
    let endDate = [
      ("0" + dt.getDate()).slice(-2),
      ("0" + (dt.getMonth() + 1)).slice(-2),
      dt.getFullYear(),
    ].join("-");

    let createDate = [
      ("0" + ct.getDate()).slice(-2),
      ("0" + (ct.getMonth() + 1)).slice(-2),
      ct.getFullYear(),
    ].join("-");

    let modifyDate = [
      ("0" + mt.getDate()).slice(-2),
      ("0" + (mt.getMonth() + 1)).slice(-2),
      mt.getFullYear(),
    ].join("-");

    //console.log(createDate);

    const details = {
      title: posts.title,
      description: posts.desc,
      experience: posts.exp,
      skills: posts.skills,
      active: posts.deadline >= new Date() ? "YES" : "NO",
      createdAt: createDate,
      modified: modifyDate,
      deadline: endDate,
      num: posts.applications.length,
      id: posts._id.toString(),
    };

    //console.log(details);

    return res.status(200).json(details);

    //
  } catch (e) {
    return res.status(500).json("Cannot Fetch Details");
  }
});

router.get("/table/table/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    // console.log(posts);
    let applicationId = [];
    let applications = [];

    post.applications.map((application) => {
      applicationId.push(application);
    });

    // console.log(applicationId);

    await Promise.all(
      applicationId.map(async (application, i) => {
        let app = await Application.findById(application);
        applications.push(app);
      })
    );

    let result = [];
    let i = 1;

    await Promise.all(
      applications.map(async (application, i) => {
        let searcher;
        let user;

        if (!application.name) {
          searcher = await Searcher.findOne({ user: application.user });
          user = await User.findById(application.user);
        }
        let resume = await File.findById(application.resume);
        let post = await Post.findById(application.post);

        result.push({
          id: i,
          ApplicantName: application.name ? resume.name : searcher.name,
          mailID: application.name
            ? "from bulk resumes&" + application.post
            : user.email,
          PostName: post.title,
          Date: application.createdAt,
          action: resume.key,
        });
        i = i + 1;
      })
    );

    const sortedResult = result.sort((a, b) => b.Date - a.Date);

    return res.status(200).json(sortedResult);
  } catch (err) {
    return res.status(500).json("Cannot get scores");
  }
});

module.exports = router;
