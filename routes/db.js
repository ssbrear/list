const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/list");
  });
  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });
};
