/*
 * Middleware that restricts access to a route based on some test.
 * test is a function that takes in a user and returns a bool based on some property.
 */
const accessControlMiddleware = (test) => {
  return async (req, res, next) => {
    try {
      if (test(req.user)) {
        next();
      } else {
        res.status(403).send({
          message: "Not authorized to access this route",
        });
      }
    } catch (e) {
      logger.log(e.stack);
      res.status(500).send({
        error: e,
      });
    }
  };
};

module.exports = accessControlMiddleware;
