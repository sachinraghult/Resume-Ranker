const express = require("express");
const mongoose = require("mongoose");

const auth = require("../middleware/auth");
const accessControl = require("../middleware/accessControl");

const Post = require("../models/Post");
const Searcher = require("../models/Searcher");
const Application = require("../models/Application");
const File = require("../models/File");
const BulkUploadJob = require("../models/BulkUploadJob");

const celery = require("../celery");
const logger = require("../log");

const recruiterOnly = accessControl((user) => user.type == "RECRUITER");
const searcherOnly = accessControl((user) => user.type == "SEARCHER");

const createPost = async (req, res) => {
  try {
    const postData = { ...req.body, user: req.user._id };
    const newPost = new Post(postData);

    const savedPost = await newPost.save();

    logger.info(`create new post with id: ${savedPost.id}`);

    return res.status(201).send(savedPost);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("Cannot create post");
  }
};

const updatePost = async (req, res) => {
  try {
    var updatedPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { applications: req.body.applicationId },
      },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json("Cannot update post");
  }
};

const handleBookmark = async (req, res) => {
  try {
    const searcher = await Searcher.findOne({ user: req.user._id });
    if (!searcher) return res.status(404).send("Searcher not found");

    let updatedBookmark;
    // const post = await Post.findById(req.params.id);

    if (searcher.bookmarks?.includes(req.params.id)) {
      updatedBookmark = await Searcher.findByIdAndUpdate(
        searcher._id,
        {
          $pull: { bookmarks: req.params.id },
        },
        { new: true }
      );
    } else {
      updatedBookmark = await Searcher.findByIdAndUpdate(
        searcher._id,
        {
          $push: { bookmarks: req.params.id },
        },
        { new: true }
      );
    }

    return res.status(200).json(updatedBookmark);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("failed to handle bookmark");
  }
};

const getBookmarks = async (req, res) => {
  try {
    const searcher = await Searcher.findOne({ user: req.user._id });
    if (!searcher) return res.status(404).send("Searcher not found");

    const posts = await Post.find({ _id: { $in: searcher.bookmarks } });

    const applications = await Application.find({ user: req.user._id });
    const appliedPosts = applications.map((application) => application.post);

    let postsWithAppliedStatus = [];
    posts.map((post) => {
      if (appliedPosts.toString().includes(post._id.toString())) {
        postsWithAppliedStatus.push({ ...post._doc, applied: true });
      } else {
        postsWithAppliedStatus.push({ ...post._doc, applied: false });
      }
    });

    return res.status(200).send(postsWithAppliedStatus);
  } catch (err) {
    return res.status(500).send("Cannot get bookmarked posts");
  }
};

const applyToPost = async (req, res) => {
  try {
    if (req.user.type == "SEARCHER") {
      const alreadyExistPost = await Application.find({
        user: req.user._id,
        post: req.params.id,
      });
      if (alreadyExistPost.length !== 0)
        return res.status(400).send("You have already applied to this post");
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send();
    }

    const application = new Application({
      name: req.body.name,
      user: req.user._id,
      post: req.params.id,
      resume: req.body.resumeId,
    });

    post.applications = post.applications.concat(application);

    await application.save();
    await post.save();

    const task = celery.createTask("tasks.run_preprocess");
    task.applyAsync([application.id]);

    return res.status(201).send(application);
  } catch (e) {
    logger.error(e.stack);
    return res.status(500).send("Cannot create application");
  }
};

const checkIfAppliedToPost = async (req, res) => {
  try {
    const post = await Application.findOne({
      post: req.params.id,
      user: req.user._id,
    });

    if (!post) {
      return res.status(200).send(false);
    }
    return res.status(200).send(true);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("failed to check post");
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send();
    }
    return res.status(200).json(post);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("Cannot get a post");
  }
};

const getUserPosts = async (req, res) => {
  var posts = await Post.find({ user: req.user._id }).sort({ _id: -1 });

  let count = 0;
  let result = [];
  posts.map((post) => {
    if (new Date(post.deadline) < new Date()) count = count + 1;
  });
  return res.status(200).send({ count, posts });
};

const getActivePostsWithAppliedStatusForSearcher = async (req, res) => {
  try {
    const posts = await Post.find({ deadline: { $gte: new Date() } }).sort({
      _id: -1,
    });

    const applications = await Application.find({ user: req.user._id });
    const appliedPosts = applications.map((application) => application.post);

    let postsWithAppliedStatus = [];
    posts.map((post) => {
      if (appliedPosts.toString().includes(post._id.toString())) {
        postsWithAppliedStatus.push({ ...post._doc, applied: true });
      } else {
        postsWithAppliedStatus.push({ ...post._doc, applied: false });
      }
    });

    return res.status(200).send(postsWithAppliedStatus);
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send("Cannot get active posts");
  }
};

const getPosts = async (req, res) => {
  const posts = await Post.find();
  return res.status(200).send(posts);
};

const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id, user: req.user._id });
    return res.status(204).send();
  } catch (e) {
    logger.error(e.stack);
    return res.status(500).send("cannot delete post");
  }
};

const bulkUploadJob = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send();
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    logger.error(`Could not find post with id: ${req.params.id}`);
    return res.status(404).send();
  }

  if (!req.body.bulkFileId) {
    return res.status(400).send();
  }

  const bulkFile = await File.findById(req.body.bulkFileId);

  if (!bulkFile) {
    logger.error(`Could not find bulk file with id: ${req.body.bulkFileId}`);
    return res.status(404).send();
  }

  const job = new BulkUploadJob({
    user: req.user._id,
    post: post._id,
    file: bulkFile._id,
    finished: false,
  });

  const task = celery.createTask("tasks.bulk_upload_job");
  task.applyAsync([job, req.token]);

  return res.status(201).send(job);
};

const router = express.Router();

router.post("/", auth, recruiterOnly, createPost);
router.put("/", auth, updatePost);
router.put("/bookmark/:id", auth, searcherOnly, handleBookmark);
router.get("/bookmark", auth, searcherOnly, getBookmarks);
router.post("/:id/apply", auth, applyToPost);
router.get("/:id/check", auth, searcherOnly, checkIfAppliedToPost);
router.get("/:id", auth, getPostById);
router.get("/myJobs/myJobs", auth, recruiterOnly, getUserPosts);
router.get(
  "/jobFeed/jobFeed",
  auth,
  searcherOnly,
  getActivePostsWithAppliedStatusForSearcher
);
router.get("/", auth, getPosts);
router.delete("/:id", auth, recruiterOnly, deletePost);
router.post("/:id/bulk", auth, recruiterOnly, bulkUploadJob);

module.exports = router;
