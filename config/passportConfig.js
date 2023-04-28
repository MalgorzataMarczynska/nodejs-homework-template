const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/schemas/user.js");
require("dotenv").config();
const secretWord = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secretWord,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);
