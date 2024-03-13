const express = require("express");

const axios = require("axios");
const config = require("../config");

const auth = require("../middleware/auth");
const accessControl = require("../middleware/accessControl");

const User = require("../models/User");
const File = require("../models/File");
const Searcher = require("../models/Searcher");
const Post = require("../models/Post");
const Application = require("../models/Application");

const json = require("JSON");

const skills = require("../data/skills");

const logger = require("../log");

const recruiterOnly = accessControl((user) => user.type == "RECRUITER");
const searcherOnly = accessControl((user) => user.type == "SEARCHER");

const getSearchBox = async (req, res) => {
  try {
    let search = req.body.search;
    let result = [];

    let posts = await Post.find({ user: req.user._id });

    if (req.body.type === "Filter job posts report based on Title") {
      await Promise.all(
        posts.map(async (post) => {
          if (post.title.toLowerCase().includes(search.toLowerCase()))
            result.push(post.title);
        })
      );
    } else if (req.body.type === "Filter job posts report based on Skills") {
      result = skills.filter((data) =>
        data.toLowerCase().includes(search.toLowerCase())
      );
    }

    return res.status(200).send(result);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("failed to get search");
  }
};

const getReportFilter = async (req, res) => {
  try {
    let type = req.body.type;
    let search = req.body.search;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    let posts = [];

    if (type === "Overall job posts report") {
      posts = await Post.find({ user: req.user._id });
    } else if (type === "Specific posts reports") {
      posts = await Post.find({ user: req.user._id });
    } else if (type === "Filter job posts report based on Title") {
      posts = await Post.find({ user: req.user._id, title: search });
    } else if (type === "Active job posts report") {
      posts = await Post.find({
        user: req.user._id,
        deadline: { $gte: new Date() },
      });
    } else if (type === "Job posts report between a Time frame") {
      posts = await Post.find({
        user: req.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      });
    } else if (type === "Filter job posts report based on Skills") {
      let initialPosts = await Post.find({ user: req.user._id });
      initialPosts.map((post) => {
        post.skills.map((s) => {
          if (s.skill.toLowerCase().includes(search.toLowerCase())) {
            posts.push(post);
          }
        });
      });
    }

    //CREATE POST ARRAY
    let postArray = [];
    let tableArray = [];
    let scatterArray = [];
    posts.map((post) => {
      postArray.push(post);
      tableArray.push(post);
      scatterArray.push(post);
    });
    //TEXT is directly sent at the overall response

    //TABLE
    let tableApplications = [];
    let normaliserTable = [];
    await Promise.all(
      posts.map(async (post) => {
        let applications = await Application.find({ post: post._id });

        // let res = await axios.post(`${config.SERVER_URL}/normaliser`, {
        //   applications,
        // });

        let insteadofNormaliserCall = [];
        applications.map((application) => {
          if (application.preprocessing_data) {
            let preprocessing_data = JSON.parse(application.preprocessing_data);
            insteadofNormaliserCall.push({
              application: application._id,
              scores: preprocessing_data.scores,
              failed: false,
            });
          } else {
            insteadofNormaliserCall.push({
              application: application._id,
              scores: [],
              failed: true,
            });
          }
        });

        let successfulApplications = [];
        await Promise.all(
          insteadofNormaliserCall.map(async (res) => {
            if (!res.failed) {
              const app = await Application.findById(res.application);
              successfulApplications.push(app);
            }
          })
        );

        normaliserTable.push(insteadofNormaliserCall);
        tableApplications.push({ post, applications: successfulApplications });
      })
    );

    let tableSortedApplications = [];
    tableApplications.map((row) => {
      const overallRanking = row.applications.sort(
        (a, b) =>
          json.parse(b.preprocessing_data).scores[0] -
          json.parse(a.preprocessing_data).scores[0]
      );

      row.applications = overallRanking;

      row.applications = row.applications.slice(0, 5);
      tableSortedApplications.push({
        post: row.post,
        applications: overallRanking.slice(0, 5),
      });
    });

    let tableUsers = [];
    await Promise.all(
      tableSortedApplications.map(async (row) => {
        let rowUsers = [];
        await Promise.all(
          row.applications.map(async (application) => {
            let user = await User.findById(application.user);
            if (application.name) {
              let resume = await File.findById(application.resume);
              rowUsers.push({ ...user._doc, name: resume.name });
            } else {
              let searcher = await Searcher.findOne({
                user: application.user,
              });
              rowUsers.push({ ...user._doc, name: searcher.name });
            }
          })
        );
        tableUsers.push(rowUsers);
      })
    );

    // console.log("-------------------------------------------------");

    let tableDetails = [];
    await Promise.all(
      tableSortedApplications.map(async (row, i) => {
        let details = [];

        await Promise.all(
          row.applications.map(async (application, j) => {
            // let preprocessing_data = json.parse(application.preprocessing_data);

            let normalisedScore = [];
            normaliserTable[i].map((normaliser) => {
              if (
                normaliser.application.toString() === application._id.toString()
              ) {
                normalisedScore.push(normaliser);
              }
            });

            if (application.name) {
              details.push({
                users: tableUsers[i][j].name,
                scores: normalisedScore[0].scores,
              });
            } else {
              details.push({
                users: tableUsers[i][j].name,
                scores: normalisedScore[0].scores,
              });
            }
            // console.log(details);
          })
        );

        tableDetails.push({ post: row.post, details });
      })
    );

    //sorting table map
    tableDetails.map((row) => {
      const overallRanking = row.details.sort(
        (a, b) => b.scores[0] - a.scores[0]
      );
      row.details = overallRanking;
    });

    //BARGRAPH - Same content as Table

    //SCATTER CHART
    let scatterApplications = [];
    let normaliserScatter = [];
    await Promise.all(
      posts.map(async (post) => {
        let applications = await Application.find({ post: post._id });

        // let res = await axios.post(`${config.SERVER_URL}/normaliser`, {
        //   applications,
        // });

        let insteadofNormaliserCall = [];
        applications.map((application) => {
          if (application.preprocessing_data) {
            let preprocessing_data = JSON.parse(application.preprocessing_data);
            insteadofNormaliserCall.push({
              application: application._id,
              scores: preprocessing_data.scores,
              failed: false,
            });
          } else {
            insteadofNormaliserCall.push({
              application: application._id,
              scores: [],
              failed: true,
            });
          }
        });

        let successfulApplications = [];
        await Promise.all(
          insteadofNormaliserCall.map(async (res) => {
            if (!res.failed) {
              const app = await Application.findById(res.application);
              successfulApplications.push(app);
            }
          })
        );

        normaliserScatter.push(insteadofNormaliserCall);
        scatterApplications.push({
          post,
          applications: successfulApplications,
        });
      })
    );

    let scatterDetails = [];
    await Promise.all(
      scatterApplications.map(async (row, i) => {
        let details = [];

        row.applications.map((application, j) => {
          // let preprocessing_data = json.parse(application.preprocessing_data);
          let normalisedScore = [];
          normaliserScatter[i].map((normaliser) => {
            if (
              normaliser.application.toString() === application._id.toString()
            ) {
              normalisedScore.push(normaliser);
            }
          });

          details.push({
            scores: normalisedScore[0].scores,
          });
        });
        scatterDetails.push({ post: row.post, details });
      })
    );

    //OVERALL RESPONSE

    // console.log(postArray);
    scatterDetails.map((scatter) => {
      let index = postArray.indexOf(scatter.post);
      scatterArray[index] = scatter;
    });

    tableDetails.map((table) => {
      let index = postArray.indexOf(table.post);
      tableArray[index] = table;
    });

    let result = [];
    postArray.map((post, i) => {
      result.push({
        title: post.title,
        applications: post.applications.length,
        table: tableArray[i],
        scatter: scatterArray[i],
      });
    });

    return res.status(200).send(result);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("failed to filter report");
  }
};

const router = express.Router();

router.post("/searchbox", auth, recruiterOnly, getSearchBox);
router.post("/filter", auth, recruiterOnly, getReportFilter);

module.exports = router;
