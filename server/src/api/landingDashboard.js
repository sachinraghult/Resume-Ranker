const router = require("express").Router();
const json = require("JSON");

const auth = require("../middleware/auth");

const axios = require("axios");
const config = require("../config");

const User = require("../models/User");
const Searcher = require("../models/Searcher");
const File = require("../models/File");
const Post = require("../models/Post");
const Application = require("../models/Application");
const { application } = require("express");

//ROUTES PARTICULAR TO LANDING DASHBOARD

//BARGRAPH (APPLICANTS VS LATEST FIVE POSTS)
router.get("/bargraph/bargraph", auth, async (req, res) => {
  try {
    let posts = await Post.find({
      user: req.user._id,
      deadline: { $gte: new Date() },
    })
      .sort({ _id: -1 })
      .limit(5);

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json("Cannot get posts");
  }
});

//BARGRAPH (HIGHEST POST VS LOWEST POST)
router.get("/highest/lowest", auth, async (req, res) => {
  try {
    let posts = await Post.find({
      user: req.user._id,
      deadline: { $gte: new Date() },
    });
    let highest;
    let lowest;
    var max = 0;
    var min = 10000;

    posts.map((post) => {
      if (post.applications.length > max) {
        max = post.applications.length;
        highest = post;
      }
      if (post.applications.length < min) {
        min = post.applications.length;
        lowest = post;
      }
    });

    return res.status(200).json([highest, lowest]);
  } catch (err) {
    return res.status(500).json("Cannot get posts");
  }
});

//CARDS
router.get("/cards", auth, async (req, res) => {
  try {
    let posts = await Post.find({ user: req.user._id });

    const t = new Date();
    let p = [];

    posts.filter((post) => post.deadline >= t).map((post) => p.push(post));

    let x = p.length;

    let y = 0;
    posts.map((post) => (y = y + post.applications.length));

    let sum = Math.ceil(y / 12);

    return res.status(200).json({ postnum: x, resumenum: y, avg: sum });
  } catch (err) {
    return res.status(500).json("Cannot fetch");
  }
});

//PIECHART (SCORE DISTRIBUTION FOR PARTICULAR SKILL)
router.post("/piechart/piechart", auth, async (req, res) => {
  try {
    let applications = await Application.find({ user: req.user._id });

    let normaliser = await axios.post(`${config.SERVER_URL}/normaliser`, {
      applications,
    });

    let scores = [];

    await Promise.all(
      applications.map(async (application) => {
        if (application.preprocessing_data) {
          var preprocessed = json.parse(application.preprocessing_data);
          if (
            preprocessed.skills.find(
              (skill) => skill.toLowerCase() == req.body.skill.toLowerCase()
            )
          ) {
            let normalisedScore = [];
            normaliser.data.map((normaliser) => {
              if (
                normaliser.application.toString() === application._id.toString()
              ) {
                normalisedScore.push(normaliser);
              }
            });

            // let normalisedScore = req.normaliser.filter((normaliser) => {
            //   normaliser.application.toString() === application._id.toString();
            // });
            // console.log(normalisedScore);

            scores.push(normalisedScore[0].scores[0]);
          }
        }
      })
    );

    return res.status(200).json(scores);
  } catch (err) {
    return res.status(500).json("Cannot get scores");
  }
});

//RECENT TABLE
router.get("/recentTable/recentTable", auth, async (req, res) => {
  try {
    let posts = await Post.find({ user: req.user._id });
    let applicationId = [];
    let applications = [];
    posts.map((post, i) => {
      post.applications.map((application) => {
        applicationId.push(application);
      });
    });

    await Promise.all(
      applicationId.map(async (application, i) => {
        let app = await Application.findById(application);
        applications.push(app);
      })
    );

    let result = [];

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
