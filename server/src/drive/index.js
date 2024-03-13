const { google } = require("googleapis");
const bufferToStream = require("../utils/buf2stream");
const fs = require("fs");

const config = require("../config");

const auth = new google.auth.GoogleAuth({
  keyFile: config.KEYFILEPATH,
  scopes: config.SCOPES,
});

const createAndUploadPdfFile = async (req, auth) => {
  const driveService = google.drive({ version: "v3", auth });
  const fileMetaData = {
    name: req.body.name,
    parents: ["1NPWtzX4AXQ6Jd0MHIX-1RbbZdzLysKpb"],
  };
  const media = {
    mimeType: "application/pdf",
    body: fs.createReadStream("./src/resumes/" + req.body.name),
  };
  return driveService.files
    .create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    })
    .then((response) => {
      req.fileId = response.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
};

const createAndUploadZipFile = async (req, auth) => {
  const driveService = google.drive({ version: "v3", auth });
  const fileMetaData = {
    name: req.body.name,
    parents: ["1NPWtzX4AXQ6Jd0MHIX-1RbbZdzLysKpb"],
  };
  const media = {
    mimeType: "application/zip",
    body: fs.createReadStream("./src/resumes/" + req.body.name),
  };
  return driveService.files
    .create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    })
    .then((response) => {
      req.fileId = response.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
};

const createAndUploadImgFile = async (req, auth) => {
  const driveService = google.drive({ version: "v3", auth });
  const fileMetaData = {
    name: req.body.name,
    parents: ["1UyHAN24uPv0LjiN9PSAZ_uAyHwsRkh2F"],
  };
  const media = {
    mimeType: "image/",
    body: fs.createReadStream("./src/resumes/" + req.body.name),
  };
  return driveService.files
    .create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    })
    .then((response) => {
      req.fileId = response.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
};

// CODE TO MOVE FILES BETWEEN FOLDERS IN GOOGLE DRIVE

// const moveFile = async (fileId, auth) => {
//   const driveService = google.drive({ version: "v3", auth });

//   folderId = "";

//   return driveService.files
//     .get({
//       fileId: fileId,
//       fields: "parents",
//     })
//     .then(async (response) => {
//       var previousParents = response.data.parents.join(",");
//       await driveService.files
//         .update({
//           fileId: fileId,
//           addParents: folderId,
//           removeParents: previousParents,
//           fields: "id, parents",
//         })
//         .then((response) => {
//           console.log("File Moved!");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// module.exports.moveFile = moveFile;
module.exports.createAndUploadPdfFile = createAndUploadPdfFile;
module.exports.createAndUploadZipFile = createAndUploadZipFile;
module.exports.createAndUploadImgFile = createAndUploadImgFile;
module.exports.auth = auth;
