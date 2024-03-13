const express = require("express");

const User = require("../models/User");
const Searcher = require("../models/Searcher");
const Recruiter = require("../models/Recruiter");

const auth = require("../middleware/auth");

const logger = require("../log");

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    user.tokens = user.tokens.concat(token);

    await user.save();

    let type = user.type;
    let profile = await user.getProfile();
    const email = req.body.email;

    logger.debug(`user ${user.type}(${user.email}) logged in`);

    return res.status(200).send({ email, profile, token, type });
  } catch (e) {
    logger.error(e.stack);
    return res.status(500).send({ error: "invalid request" });
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user;

    user.tokens = user.tokens.filter(
      (token) => token.toString() !== req.token.toString()
    );

    await user.save();

    logger.debug(`user ${req.user.type}(${req.user.email}) logged out`);

    return res.status(204).send();
  } catch (e) {}
};

const register = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    let user = new User({
      email,
      password,
      type,
    });

    await user.save();

    const token = user.generateAuthToken();

    await user.save();

    if (type == "SEARCHER") {
      let searcher = new Searcher({
        user: user._id,
        name: req.body.name,
        applications: [],
        bookmarks: [],
      });
      await searcher.save();
    } else if (type == "RECRUITER") {
      let recruiter = new Recruiter({
        user: user._id,
        name: req.body.name,
        jobs: [],
      });
      await recruiter.save();
    }

    logger.debug(`created new user ${user.type}(${user.email}) `);

    return res
      .status(201)
      .send({ user: { email: user.email, type: user.type } });
  } catch (e) {
    logger.error(e.stack);
    return res.status(400).send({ error: "unable to register user" });
  }
};

const router = new express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", auth, logout);

module.exports = router;
