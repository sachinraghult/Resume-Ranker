const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const config = require("../config");

const logger = require("../log");

let mongod = null;
let dbUrl = config.MONGODB_URL;

(async () => {
  if (process.env.NODE_ENV === "test") {
    mongod = await MongoMemoryServer.create();
    dbUrl = mongod.getUri();
    console.log(dbUrl);
  }

  mongoose.connect(
    dbUrl,
    {
      useNewUrlParser: true,
      // autoReconnect: true,
      useUnifiedTopology: true,
    },
    function (error) {
      if (error) {
        logger.error(error, error.stack);
      } else {
        logger.info(`Connected to mongodb at ${config.MONGODB_URL}`);
      }
    }
  );
})();
