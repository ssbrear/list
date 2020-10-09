const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  // CREATE NEW USER
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
  // VALIDATE EXISTING USER
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/list");
  });

  // CREATE NEW ITEM ON USERLISTS TABLE
  app.post("/api/createitem", (req, res) => {
    console.log(req.user);
    db.UserList.create({
      item: req.body.item,
      user_id: req.user.id,
    }).then(res.redirect("/list"));
  });

  // Loads login/sign up page
  app.get("/", (req, res) => {
    res.render("index");
  });

  // Renders the list page with all of the user's items
  app.get("/list", checkAuth, (req, res) => {
    db.UserList.findAll({
      attributes: ["item"],
      where: {
        user_id: req.user.id,
      },
    }).then((data) => {
      const items = [];
      data.forEach((element) => {
        items.push(element.dataValues);
      });
      console.log(items);
      res.render("list", { item: items });
    });
  });

  app.delete("/api/deleteitem/:item", (req, res) => {
    db.UserList.destroy({
      where: {
        item: req.params.item,
      },
    }).then((response) => {
      console.log(response);
      res.redirect("/list");
    });
  });

  // Middleware to not allow access to the list without being signed in
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
