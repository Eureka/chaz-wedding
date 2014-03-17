var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User  = require('./userModel.js');


passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},function(username, password, done) { 
  console.log("local envoked", username, password);
   User.find({where:{email: username}}).success(function(user){
      if (!user){
	console.log('No Such User', username);
        return done(null, false, {message: "incorrect information"});
      }
      if (user.password !== password){
	console.log('Bad Password: ', password, 'Username: ', username);
        return done(null, false);
      }
      done(null, { id: user.id, is_attending: user.is_attending, email: user.email, group: user.groups });
    });
  }));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

