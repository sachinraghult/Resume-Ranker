module.exports = {
  PORT: process.env.PORT || 5000,
  SERVER_URL: process.env.SERVER_URL || "http://localhost:5000",
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ccibt9",
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
  JWT_SECRET: process.env.JWT_SECRET || "lolmao12345",
  CELERY_BROKER_URL: process.env.CELERY_BROKER_URL || "amqp://localhost",
  KEYFILEPATH: "./ranking-algorithm-389c138ee6ee.json",
  SCOPES: ["https://www.googleapis.com/auth/drive"],
  FILE_UPLOAD_BACKEND: "GDRIVE",
  FILE_UPLOAD_CONFIG: {
    keyfilePath: "./ranking-algorithm-389c138ee6ee.json",
  },
  FILE_UPLOAD_BASE_URL: "https://drive.google.com/uc?export=download&id=",
};
