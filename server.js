////// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

////// DATABASE
const db = require("./models");

////// EXPRESS
//// INITIALIZE
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
////// PASSPORT
const passport = require("./config/passport");
const { urlencoded } = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//// MIDDLEWARE
// AUTHENTICATION
app.use(passport.initialize());
// HAS ACCESS TO 'public' FOLDER
app.use(express.static("public"));
// DATA PARSING
app.use(express.json());
app.use(urlencoded({ extended: true }));
// ALLOWS THE USER TO STAY LOGGED IN WHILE NAVIGATING THE SITE
app.use(
  session({
    secret: "h48aaf6e7468bht46E8FSB15D6",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.session());

////// HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
////// ROUTES
require("./routes/html")(app);
require("./routes/db")(app);

////// RUN SERVER
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running at http://localhost:" + PORT);
  });
});
