const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
