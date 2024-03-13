const express = require("express");

const auth = require("../middleware/auth");

const Recruiter = require("../models/Recruiter");
const Searcher = require("../models/Searcher");

const logger = require("../log");

const getProfile = async (req, res) => {
  let user = req.user;
  let profile = await user.getProfile();
  let type = user.type;
  let email = user.email;

  return res.status(200).json({ profile, type, email });
};

const updateProfile = async (req, res) => {
  if (req.user.type == "RECRUITER") {
    try {
      const profile = await Recruiter.findOneAndUpdate(
        { user: req.user._id },
        {
          $set: req.body,
        },
        { new: true }
      );

      return res.status(200).send(profile);
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).send(err);
    }
  } else {
    try {
      const profile = await Searcher.findOneAndUpdate(
        { user: req.user._id },
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).send(profile);
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).send(err);
    }
  }
};

const router = express.Router();

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);

module.exports = router;
