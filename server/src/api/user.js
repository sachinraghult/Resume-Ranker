const express = require("express");

const User = require("../models/User");
const Searcher = require("../models/Searcher");
const Recruiter = require("../models/Recruiter");
const auth = require("../middleware/auth");
const accessControl = require("../middleware/accessControl");

const recruiterOnly = accessControl((user) => user.type == "RECRUITER");
const searcherOnly = accessControl((user) => user.type == "SEARCHER");

const router = require("express").Router();

const getUserForSettingState = async (req, res) => {
  let user = req.user;
  let profile = await user.getProfile();
  let type = user.type;
  let email = user.email;

  return res.status(200).json({ profile, type, email });
};

// const toTestAccessControl = async (req, res) => {
//   return res.status(200).json();
// };

router.get("/", auth, getUserForSettingState);
// router.get("/dummy", searcherOnly, toTestAccessControl);

module.exports = router;
