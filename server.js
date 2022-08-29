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
  cookie: {maxAge: 60000 * 10}, // 10min
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//----- Routes
app.use(require("./routes/auth"));
app.use(require("./routes/yelpApi"));
app.use(require("./routes/user"));

if(process.env.NODE_ENV === 'production') {
  // Serve static files from the client folder
  app.use(express.static('client/build'));
  // Load the React "index" for any "GET" routes not defined above
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
 
//----- Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // Connect to DB when server starts
  db.connect();
  console.log(`Server is running on port: ${port}`);
});