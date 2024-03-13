const mongoose = require("mongoose");

const STATUS_TYPES = ["In Review", "Accepted", "Rejected"];

const ApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
    status: {
      type: String,
      enum: STATUS_TYPES,
      default: STATUS_TYPES[0],
    },
    preprocessing_data: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
