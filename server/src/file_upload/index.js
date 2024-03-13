const FileUpload = require("./base");
const GDriveFileUpload = require("./drive");

const InitFileUpload = (name, config) => {
  switch (name) {
    case "GDRIVE":
      return new GDriveFileUpload(config);
    default:
      throw new Error("No such file upload backend implemented");
  }
};

module.exports = {
  FileUpload,
  InitFileUpload,
};
