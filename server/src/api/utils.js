const express = require("express");
const fs = require("fs");
const mime = require("mime-types");

const { Readable } = require("stream");

const { InitFileUpload } = require("../file_upload");

const File = require("../models/File");

const auth = require("../middleware/auth");

const config = require("../config");
const log = require("../log");

const fileUpload = InitFileUpload(
  config.FILE_UPLOAD_BACKEND,
  config.FILE_UPLOAD_CONFIG
);

const bufferToStream = (buffer) => {
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
};

const delay = (ms) => {
  const startPoint = new Date().getTime();
  while (new Date().getTime() - startPoint <= ms) {
    /* wait */
  }
};

const uploadFile = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = bufferToStream(req.files.file.data);
  const name = req.body.name || "Random.pdf";

  const mimeType = mime.lookup(name.split(".")[1]);

  try {
    const key = await fileUpload.uploadFile({ name, file, mimeType });
    const url = fileUpload.getUrl(key);

    const fileDoc = new File({
      owner: req.user._id,
      key,
      name,
      url,
    });

    await fileDoc.save();

    return res.status(200).send(fileDoc);
  } catch (e) {
    log.error(e.stack);
    return res.status(500).send("cannot upload file");
  }
};

const router = express.Router();

router.post("/upload", auth, uploadFile);

module.exports = router;
