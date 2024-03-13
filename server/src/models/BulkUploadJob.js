const mongoose = require("mongoose");

const BulkUploadJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
    finished: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BulkUploadJob", BulkUploadJobSchema);
