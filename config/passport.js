const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
    new LocalStrategy((username, password, done) => {
      {
        db.User.findOne({
          where: {
            username: username,
          },
        }).then((foundUser) => {
          if (!foundUser) {
            return done(null, false, {
              message: "No user found.",
            });
          } else if (!foundUser.validPassword(password)) {
            return done(null, false, {
              message: "Incorrect password.",
            });
          }
          return done(null, foundUser);
        });
      }
    })
  );
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  module.exports = passport;