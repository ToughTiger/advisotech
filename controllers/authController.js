const { User } = require("../util/database");
const bcrypt = require("bcrypt");
const {
  generateAuthToken,
  validateLogin,
  validateSignup,
} = require("../middleware/authentication");
const _ = require("lodash");

exports.authenticate = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.json({ message: error.details[0].message });

    let user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.json({ message: "Invalid email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.json({ message: "Invalid email or password" });
    user = _.pick(user, ["id", "name", "userRole", "email"]);
    const token = await generateAuthToken(user);
    return res.header("x-auth-token", token).json({ token });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { error } = validateSignup(req.body);

    if (error) return res.json({ message: error.details[0].message });

    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) return res.json({ message: "email already taken." });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    let signupUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      userRole: req.body.userRole,
      address: req.body.address,
      image: req.body.image,
    });
    // const token = await generateAuthToken(signupUser);
    return res.json({
      message: "Signup Successful. We are redirecting you to login page",
      signupUser,
    });
  } catch (ex) {
    next(ex);
  }
};
