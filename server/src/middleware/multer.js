const multer = require("multer");

var storage = multer.memoryStorage();
const multerUpload = () => multer({ storage: storage });

module.exports = multerUpload;
