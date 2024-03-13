const mongoose = require("mongoose");

const SearcherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    linkedinId: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    location: {
      type: String,
    },
    applications: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Application",
    },
    dob: {
      type: Date,
    },
    bookmarks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Searcher", SearcherSchema);
