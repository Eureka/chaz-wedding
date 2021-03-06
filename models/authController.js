var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User  = require('./userModel.js');

var error        = require('../lib/utils').error;
var sendRsvpLink = require('../lib/email').sendRsvpLink;
var invs         = require('../lib/invitations');
var guests       = require('../lib/guests');


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
console.log('InvisInvite:', invs.encipherId(user.id));
    });
  }));

//console.log('InvisInvite:', invs.invitation);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

