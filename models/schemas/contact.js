const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 35,
      match: /^[\w]+([\s]{1}[a-zA-Z]+)*$/i,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      match: /^[(\w)]+([-\s]{1}[0-9]+)*$/i,
      minlength: 12,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = mongoose.model("contact", contact);

module.exports = Contact;
