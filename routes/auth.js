const express = require("express");
const passport = require("passport");
// Models
const User = require("../models/UserModel");

const authRoutes = express.Router();

//----- Register new user
authRoutes.post("/api/auth/signup", (req, res, next) => {
  // Register user
  User.register(new User({
      username: req.body.username
    }),
    req.body.password, (err, user) => {
      if(err) {
        //--- Invalid form input
        console.log(err);
        res.json({
          success: false,
          error: err
        })
      } else {
        //--- Valid form input
        // Login newly created user
        passport.authenticate("local")(req, res, () => {
          User.findOne({
            username: req.body.username
          }, (err, person) => {
            if(err) console.log(err);
            // Create & stores user-obj in "req.user"
            req.logIn(user, err => {
              if(err) next(err);
              console.log("A new user has logged in");
              // Append user-obj to session-obj
              req.session.user = req.user;
              res.json({
                success: true,
                status: "Successfully registered"
              });
            });
          });
        })
      }
    })
});

//----- Login existing users
authRoutes.post("/api/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if(err) next(err);
      if(!user) {
        //--- Invalid login
        res.json({ 
          success: false,
          message: "Username or password was incorrect"
        });
      } else {
        //--- Valid login
        // Create & stores user-obj in "req.user"
        req.logIn(user, err => {
          if(err) next(err);
          console.log("A user has logged in");
          // Append user-obj to session-obj
          req.session.user = req.user;
          res.json({ 
            success: true,
            status: "Successfully logged in"
          });
        });
      }
  })(req, res, next);
});

//----- Logout user from existing session
authRoutes.post('/api/auth/logout', (req, res) => {
  if(req.session) {
    req.logout(err => {
      if(err) console.log(err);
      req.session.destroy((err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("A user has logged out");
          res.clearCookie("session-id");
          res.json({
            success: true,
            status: "Successfully logged out"
          });
        }
      });
    });
  } else {
    res.json({ success: false });
  }
});

//----- Return session object
authRoutes.get("/api/auth/getSession", (req, res) => {
  if(req.session.passport !== undefined) {
    //--- Valid session
    res.json({ 
      success: true,
      session: req.session
     });
  } else {
    //--- Invalid session
    res.json({ success: false });
  }
});

module.exports = authRoutes;