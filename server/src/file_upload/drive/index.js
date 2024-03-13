const { google } = require("googleapis");
const FileUpload = require("../base");

const GOOGLE_DRIVE_BASE_URL = "https://drive.google.com/uc?export=download&id=";

class GDriveFileUpload extends FileUpload {
  constructor({ keyfilePath }) {
    super();
    const auth = new google.auth.GoogleAuth({
      keyFile: keyfilePath,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    this.drive = google.drive({ version: "v3", auth });
  }

  async uploadFile({ name, file, mimeType }) {
    const media = {
      mimeType,
      body: file,
    };

    const resource = {
      name,
      parents: ["1NPWtzX4AXQ6Jd0MHIX-1RbbZdzLysKpb"],
    };

    try {
      const res = await this.drive.files.create({
        resource,
        media,
        fields: "id",
      });

      return res.data.id;
    } catch (err) {
      throw new Error(`error uploading file to drive: ${err}`);
    }
  }

  async deleteFile(key) {
    try {
      const _res = await this.drive.files.delete({
        fileId: key,
      });
      return true;
    } catch (err) {
      throw new Error(`error deleting file from drive: ${err}`);
    }
  }

  getUrl(key) {
    return GOOGLE_DRIVE_BASE_URL + key;
  }
}

module.exports = GDriveFileUpload;
