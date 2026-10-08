const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.token;

  try {
    const verified = jwt.verify(token, JWT_USER_PASSWORD);

    req.userId = verified.id;

    next();
  } catch (e) {
    return res.status(401).json({
      message: "User session expired or invalid.",
    });
  }
}

module.exports = {
  userMiddleware: userMiddleware,
};