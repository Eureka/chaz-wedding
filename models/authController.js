var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User  = require('./userModel.js');


passport.use(new LocalStrategy({usernameField: 'email'},function(username, password, done) { 
  // insert your MongoDB check here. For now, just a simple hardcoded check.
  console.log('user.password');
  console.log("local envoked");
// var User = require('./userModel.js').User;
  console.log ('user.username'); 
   User.find({email: 'email'}).success(function(user){
      if (!user){
        return done(null, false);
      }
      if (user.password !== password){
        return done(null, false);
      }
      done(null, { email: user.email });
    });
  }));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
