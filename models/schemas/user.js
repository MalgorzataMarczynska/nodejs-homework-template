const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      maxlength: 150,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      avatarURL: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};
user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};
user.methods.setAvatar = function (avatarURL) {
  this.avatar.avatarURL = avatarURL;
};

const User = mongoose.model("user", user);

module.exports = User;
