const express = require("express");
const json = require("JSON");
var mongoose = require("mongoose");

const axios = require("axios");
const config = require("../config");

const celery = require("../celery");

const auth = require("../middleware/auth");
const accessControl = require("../middleware/accessControl");

const User = require("../models/User");
const Post = require("../models/Post");
const File = require("../models/File");
const Application = require("../models/Application");
const Searcher = require("../models/Searcher");

const organisation = require("../data/organisation");
const instituition = require("../data/instituition");
const skills = require("../data/skills");

const logger = require("../log");

const recruiterOnly = accessControl((user) => user.type == "RECRUITER");
const searcherOnly = accessControl((user) => user.type == "SEARCHER");

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    return res.status(200).send(application);
  } catch (err) {
    logger.error(err);
    return res.status(500).send("cannot get application");
  }
};

const getApplicationByUserAndPost = async (req, res) => {
  try {
    const application = await Application.findOne({
      user: req.user._id,
      post: req.params.id,
    });

    return res.status(200).send(application);
  } catch (err) {
    logger.error(err);
    return res.status(500).send("cannot get application for the post");
  }
};

const getUserApplications = async (req, res) => {
  try {
    let applications = await Application.find({ user: req.user._id })
      .sort({ _id: -1 })
      .populate(
        "post",
        "title desc exp skills tags deadline email image createdAt updatedAt"
      );

    return res.status(200).send(applications);
  } catch (err) {
    logger.error(err);
    return res.status(500).send("Cannot get user applications");
  }
};

const getRecruiterApplications = async (req, res) => {
  try {
    let posts = await Post.find({ user: req.user._id });
    let totalApplications = [];

    await Promise.all(
      posts.map(async (post) => {
        let applications = await Application.find({ post: post._id });
        totalApplications = totalApplications.concat(applications);
      })
    );

    return res.status(200).send(totalApplications);
  } catch (err) {
    logger.error(err);
    return res.status(500).send("Cannot get recruiter applications");
  }
};

const checkApplicationForThePostByTheUser = async (req, res) => {
  try {
    var post = await Application.findOne({
      user: req.user._id,
      post: req.params.id,
    });

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json("Cannot get applications");
  }
};

const getResume = async (req, res) => {
  try {
    let application = await Application.findOne({
      post: req.params.id,
      user: req.user._id,
    });
    if (!application) return res.status(404).send("Resume not found");

    let resume = await File.findOne({ _id: application.resume });

    return res.status(200).json(resume);
  } catch (err) {
    return res.status(500).json("Cannot get applications");
  }
};

const searchApplications = async (req, res) => {
  try {
    let search = req.body.search;
    let result;

    if (req.body.type === "Organisation") {
      result = organisation.filter((data) =>
        data.toLowerCase().includes(search.toLowerCase())
      );
    } else if (req.body.type === "Instituition") {
      result = instituition.filter((data) =>
        data.toLowerCase().includes(search.toLowerCase())
      );
    } else if (req.body.type === "Skills") {
      result = skills.filter((data) =>
        data.toLowerCase().includes(search.toLowerCase())
      );
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send("Cannot get search items");
  }
};

const updateApplication = async (req, res) => {
  try {
    let application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).send();
    }

    return res.status(200).send();
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("cannot update application");
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    let application = await Application.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { status: req.body.status },
      },
      { new: true }
    );

    return res.status(200).send(application);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("cannot update application");
  }
};

const deleteApplication = async (req, res) => {
  try {
    let application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).send();
    }
    return res.status(204).send();
  } catch (err) {
    logger.error(err);
    return res.status(500).send("cannot delete application");
  }
};

const getRanking = async (req, res) => {
  try {
    let applications = await Application.find({ post: req.params.id });
    let normaliser = await axios.post(`${config.SERVER_URL}/normaliser`, {
      applications: applications,
    });

    const result = [];
    const failed = [];
    await Promise.all(
      applications.map(async (application, ids) => {
        const particularResume = await File.findById(application.resume);

        let normalisedScore = [];
        normaliser.data.map((normaliser) => {
          if (
            normaliser.application.toString() === application._id.toString()
          ) {
            normalisedScore.push(normaliser);
          }
        });

        if (application.preprocessing_data) {
          let preprocessing_normalisedData = json.parse(
            application.preprocessing_data
          );
          preprocessing_normalisedData.scores = normalisedScore[0].scores;

          //final result push
          if (application.name) {
            let img =
              "https://flyclipart.com/thumb2/pdf-icon-png-png-image-125682.png";

            result.push({
              id: ids,
              applicationId: application._id,
              username: particularResume.name,
              status: application.status,
              preprocessing_data: preprocessing_normalisedData,
              resumeId: particularResume.key,
              img: img,
              isBulk: true,
            });
          } else {
            let img =
              "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png";

            const particularUser = await Searcher.findOne({
              user: application.user,
            });

            result.push({
              id: ids,
              applicationId: application._id,
              username: particularUser.name,
              status: application.status,
              preprocessing_data: preprocessing_normalisedData,
              resumeId: particularResume.key,
              img: img,
              isBulk: false,
            });
          }
        } else {
          let img =
            "https://cdn3d.iconscout.com/3d/premium/thumb/cloud-cancel-5309403-4475078.png";

          if (application.name)
            failed.push({
              id: ids,
              applicationId: application._id,
              username: particularResume.name,
              status: application.status,
              resumeId: particularResume.key,
              img: img,
              isBulk: true,
            });
          else {
            const particularUser = await Searcher.findOne({
              user: application.user,
            });

            failed.push({
              id: ids,
              applicationId: application._id,
              username: particularUser.name,
              status: application.status,
              resumeId: particularResume.key,
              img: img,
              isBulk: false,
            });
          }
        }
        ids = ids + 1;
      })
    );

    return res.status(200).json({ result, failed });
  } catch (err) {
    return res.status(500).json("Cannot get ranking");
  }
};

//GET PREPROCESSED DATA FOR APPLICATION
const getPreprocessApplication = async (req, res) => {
  try {
    let application = await Application.findById(req.params.id);

    if (!application.preprocessing_data)
      return res.status(200).json({
        preprocessing_data: "",
        status: application.status,
      });

    let applications = await Application.find({ post: application.post });

    let normaliser = await axios.post(`${config.SERVER_URL}/normaliser`, {
      applications,
    });

    let normalisedScore = [];

    normaliser.data.map((normaliser) => {
      if (normaliser.application.toString() === application._id.toString()) {
        normalisedScore.push(normaliser);
      }
    });

    let responsePost;
    if (application.preprocessing_data) {
      let preprocessed = json.parse(application.preprocessing_data);
      preprocessed.scores = normalisedScore[0].scores;
      responsePost = {
        preprocessing_data: preprocessed,
      };
    }

    return res.status(200).send({
      preprocessing_data: responsePost,
      status: application.status,
    });
  } catch (err) {
    return res.status(500).send("Cannot get specific application");
  }
};

// GET PREPRCOESSED PROFILE PAGE DETAILS
const getPreprocessedProfileDetails = async (req, res) => {
  try {
    let application = await Application.findById(req.params.id);

    if (application.name) {
      return res.status(200).json({
        name: application.name,
        isSearcher: false,
      });
    } else {
      let responseUser = await User.findById(application.user);
      let responseSearcher = await Searcher.findOne({ user: responseUser._id });
      return res.status(200).json({
        ...responseUser._doc,
        name: responseSearcher.name,
        isSearcher: true,
      });
    }
  } catch (err) {
    return res.status(500).json("Cannot get specific application");
  }
};

const router = express.Router();

router.get("/:id", auth, getApplicationById);
router.get("/post/:id", auth, getApplicationByUserAndPost);
router.get("/", auth, searcherOnly, getUserApplications);
router.get(
  "/recruiter/recruiter",
  auth,
  recruiterOnly,
  getRecruiterApplications
);
router.get(
  "/check/:id",
  auth,
  searcherOnly,
  checkApplicationForThePostByTheUser
);
router.get("/resume/:id", auth, getResume);
router.get("/ranking/:id", auth, recruiterOnly, getRanking);
router.get("/preprocess/:id", auth, getPreprocessApplication);
router.get("/user/:id", auth, recruiterOnly, getPreprocessedProfileDetails);
router.post("/searchbox", auth, recruiterOnly, searchApplications);
router.put("/:id", auth, searcherOnly, updateApplication);
router.put("/status/:id", auth, recruiterOnly, updateApplicationStatus);
router.delete("/:id", auth, searcherOnly, deleteApplication);

module.exports = router;
