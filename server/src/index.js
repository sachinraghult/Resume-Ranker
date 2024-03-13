const app = require("./app");
const config = require("./config");
const log = require("./log");

app.listen(config.PORT, () => {
  log.info(`Server is listening on port ${config.PORT}`);
});
