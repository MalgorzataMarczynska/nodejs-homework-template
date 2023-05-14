const jwt = require("jsonwebtoken");
const passport = require("passport");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
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
    const avatar = gravatar.url(email, {
      s: "100",
      format: "jpg",
    });
    const verificationToken = uuidv4();
    const newUser = new User({
      email,
      subscription: "starter",
      verificationToken: verificationToken,
    });
    newUser.setPassword(password);
    newUser.setAvatar(avatar);
    await newUser.save();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const myEmail = process.env.MY_EMAIL;
    const verificationEmail = {
      to: [myEmail, { email }],
      from: myEmail,
      subject: "ContactPhoneBook verification email",
      text: `Please confirm your email address at http://localhost3000/api/users/verify/${verificationToken}`,
      html: `Please confirm your email address at <strong><a href="http://localhost3000/api/users/verify/${verificationToken}">www.localhost3000/api/users/verify/${verificationToken}</a></strong>`,
    };
    await sgMail.send(verificationEmail);
    res.status(201).json({
      status: "Success",
      code: 201,
      message:
        "Registration successful! Verification e-mail has just been sent, please verify your e-mail",
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
  if (!user || !user.validPassword(password) || !user.verify) {
    return res.status(401).json({
      status: "Unathorized",
      code: 401,
      message:
        "Incorrect login or password or you are not verified your email yet. If you have not verified yet, please check your e-mail box or go to 'api/users/verify' to get second verify email",
      data: "Bad credentials",
    });
  }
  try {
    const { id, email, subscription, avatar } = user;
    const payload = { id: id };
    const token = jwt.sign(payload, secretWord, { expiresIn: "1h" });
    await models.updateUser(id, { token: token });
    res.header("Authorization", `Bearer ${token}`);
    res.json({
      status: "Success",
      code: 200,
      data: { token: token, user: { email, subscription, avatar } },
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
const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const { avatar } = req.file;
  try {
    await models.updateUser(id, { avatar });
    res.json({
      status: "Success",
      code: 200,
      data: { avatarURL: "" },
    });
  } catch (error) {
    next(error);
  }
};
const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });
  try {
    await models.updateUser(user.id, { verificationToken: null, verify: true });
    res.json({
      status: "Verification successful",
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};
const secondVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ status: "error", message: "missing required field email" });
  const user = await User.findOne({ email });
  if (user.verify)
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const myEmail = process.env.MY_EMAIL;
    const verificationEmail = {
      to: [myEmail, { email }],
      from: myEmail,
      subject: "ContactPhoneBook verification email",
      text: `Please confirm your email address at http://localhost3000/api/users/verify/${user.verificationToken}`,
      html: `Please confirm your email address at <strong><a href="http://localhost3000/api/users/verify/${user.verificationToken}">www.localhost3000/api/users/verify/${user.verificationToken}</a></strong>`,
    };
    await sgMail.send(verificationEmail);
    res.json({ code: 200, message: "Verification email sent" });
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
  updateAvatar,
  verifyEmail,
  secondVerifyEmail,
};
