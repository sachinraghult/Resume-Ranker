const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    exp: {
      type: String,
      required: true,
    },
    keywords: {
      type: [{ keyword: { type: String } }],
      required: true,
    },
    skills: {
      type: [{ skill: { type: String }, value: { type: Number } }],
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    deadline: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "File",
    },
    applications: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Application",
    },
  },
  { timestamps: true }
);

// PostSchema.pre("remove", async function (next) {
//   const post = this;

//   post.applications.forEach((app_id) => {
//     Application.delete(app_id);
//   });

//   next();
// });

module.exports = mongoose.model("Post", PostSchema);
