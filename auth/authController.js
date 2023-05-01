const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/schemas/user.js");
const models = require("../models/usersFunc.js");
require("dotenv").config();
const secretWord = process.env.SECRET;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!user || err || user.token !== token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ status: "error", message: "missing field" });
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Bad credencials",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email, subscription: "starter" });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Registration successful",
      data: { newUser },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ status: "error", message: "missing field" });
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "Unathorized",
      code: 401,
      message: "Incorrect login or password",
      data: "Bad credentials",
    });
  }
  try {
    const { id, email, subscription } = user;
    const payload = { id: id };
    const token = jwt.sign(payload, secretWord, { expiresIn: "1h" });
    await models.updateUser(id, { token: token });
    res.header("Authorization", `Bearer ${token}`);
    res.json({
      status: "Success",
      code: 200,
      data: { token: token, user: { email, subscription } },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    await models.updateUser(req.user.id, { token: null });
    res.json({
      status: "No content",
      code: 204,
      data: "Not found",
    });
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.json({
      status: "Success",
      code: 200,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};
const updateSubscription = async (req, res, next) => {
  const { id, email } = req.user;
  const { subscription } = req.body;
  try {
    await models.updateUser(id, { subscription });
    res.json({
      status: "Success",
      code: 200,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
};
