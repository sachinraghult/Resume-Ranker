const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../config");

const Recruiter = require("./Recruiter");
const Searcher = require("./Searcher");

const USER_TYPES = ["SEARCHER", "RECRUITER"];

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
      enum: USER_TYPES,
      required: true,
    },
    tokens: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user.id }, config.JWT_SECRET);

  return token;
};

UserSchema.methods.getProfile = async function () {
  const user = this;
  let profile = null;

  if (user.type == "SEARCHER") profile = await Searcher.findOne({ user });
  else if (user.type == "RECRUITER")
    profile = await Recruiter.findOne({ user });

  return profile;
};

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) return null;

  if (user.password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
  }
  return user;
};

UserSchema.statics.findByToken = async function (token) {
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || !user.tokens.includes(token)) throw new Error("invalid token");
  return user;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
      user.tokens = [];
    }
  }

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
