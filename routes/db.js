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
      //user_id: req.user.dataValues.id,
    }).then(res.redirect("/list"));
  });

  // GET LIST ITEMS FROM USERLISTS TABLE
  app.get("/api/retrieveitems/", (req, res) => {
    db.UserList.findAll({
      where: {
        userid: req.params.userid,
      },
    }).then((data) => {
      res.json(data);
    });
  });
};
