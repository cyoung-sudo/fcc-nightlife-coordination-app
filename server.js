//----- Imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const db = require("./config/conn"); // DB connection
// Passport
const passport = require("passport");
require("./config/passportConfig")(passport); // Pass "passport" to config file
// Session
const session = require("express-session");

//----- Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  name: "session-id",
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 20000}, // 20sec
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//----- Routes
app.use(require("./routes/auth"));
 
//----- Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // Connect to DB when server starts
  db.connect();
  console.log(`Server is running on port: ${port}`);
});