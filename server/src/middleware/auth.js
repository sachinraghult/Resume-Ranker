const User = require("../models/User");

const logger = require("../log");

const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) return res.status(401).send({ error: "not authenticated" });

    let token = header.replace("Bearer ", "");
    const user = await User.findByToken(token);
    if (!user) return res.status(401).send({ error: "not authenticated" });

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send({ error: "failed to authenticate" });
  }
};

module.exports = auth;
