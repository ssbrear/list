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
const flash = require("connect-flash");
const app = express();
const PORT = process.env.PORT || 3000;
//// MIDDLEWARE
// DATA PARSING
app.use(express.static("public"));
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
// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

////// HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
////// ROUTES
require("./routes/db")(app);

////// RUN SERVER
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running at http://localhost:" + PORT);
  });
});
