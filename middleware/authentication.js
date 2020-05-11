const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

const generateAuthToken = async (user) => {
  token = jwt.sign({ user: user }, process.env.SECRET);
  return token;
};

const validateLogin = (req) => {
  const schema = {
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(8).max(255).required(),
  };
  return joi.validate(req, schema);
};

const authorize = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied!! No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;

    next();
  } catch (ex) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { userRole } = req.user;

    if (!userRole)
      return res.status(401).json({
        message:
          "forbidden!!! You are not authoriszed to perform this task. Please Contact Adminstrator.",
      });
  } catch (ex) {
    next(ex);
  }

  next();
};

const validateSignup = (req) => {
  const schema = {
    name: joi.string().min(5).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(8).max(255).required(),
    address: joi.string().required(),
    userRole: joi.string().required(),
    image: joi.string(),
  };
  return joi.validate(req, schema);
};

const validateConnector = (req) => {
  const schema = {
    name: joi.string().min(5).required(),
    email: joi.string().min(5).max(255).required().email(),
    pin: joi.string().required(),
    city: joi.string().required(),
    mobile: joi.string().required(),
  };
  return joi.validate(req, schema);
};

const errMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message:
      "Something failed at server. Our engineers are working on it. please wait...",
    error: err,
  });
};

module.exports = {
  generateAuthToken,
  validateLogin,
  validateSignup,
  authorize,
  isAdmin,
  errMiddleware,
  validateConnector,
};
