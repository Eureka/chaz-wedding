var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var userModel  = require('./userModel.js');

/*
var AuthController = {

  login: passport.authenticate('local', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failure'
  }),

  loginSuccess: function(req, res){
    res.json({
      success: true,
      user: req.session.passport.user
    });
  },

  loginFailure: function(req, res){
    res.json({
      success:false,
      message: 'Invalid username or password.'
    });
  },

  logout: function(req, res){
    req.logout();
    res.end();
  },
};

*/


passport.use(new LocalStrategy(function(username, password, done) { 
  // insert your MongoDB check here. For now, just a simple hardcoded check.
  console.log("local envoked");
  if (username === 'foo' && password === 'bar')
  {
    //done(null, { user: username });
    console.log("should have passed");
    console.log(username);
    console.log(password);
    //return done(null, false, { message: 'Nobody here by that name'} );
    done(null, { user: username });
  }
  else
  {
    //done(null, false);
    console.log("should have failed");
    console.log(username);
    console.log(password);
    //return done(null, false, { message: 'Wrong password'} );
    done(null, false);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};


/*
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
};
*/