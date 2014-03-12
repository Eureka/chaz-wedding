var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User  = require('./userModel.js');


passport.use(new LocalStrategy(function(username, password, done) { 
// Set system to use email as username.
 usernameField: 'email',
 passwordField: 'password',
  // insert your MongoDB check here. For now, just a simple hardcoded check.
  console.log("local envoked");
// var User = require('./userModel.js').User;
  console.log ('user.username'); 
   User.find({username: 'username'}).success(function(user){
      if (!user){
        return done(null, false);
      }
      if (user.password !== password){
        return done(null, false);
      }
      done(null, { username: user.username });
    });
  }));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
