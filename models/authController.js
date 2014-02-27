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

var auth = {};
  auth.localStrategy = new PassportLocalStrategy({
    username: 'username',
    password: 'password'
  },

  function (username, password, done){
    var User = require('./User').User;
    User.find({username: username}).success(function(user){
      if (!user){
        return done(null, false, { message: 'Nobody here by that name'} );
      }
      if (user.password !== password){
        return done(null, false, { message: 'Wrong password'} );
      }
      return done(null, { username: user.username });
    });
  }
);

auth.validPassword = function(password){
  return this.password === password;
};

auth.serializeUser = function(user, done){
  done(null, user);
};

auth.deserializeUser = function(obj, done){
  done(null, obj);
};

*/

/*
passport.use(new LocalStrategy(function(username, password, done) { 
  // insert your MongoDB check here. For now, just a simple hardcoded check.
  if (username === 'foo' && password === 'bar')
  {
    //done(null, { user: username });
    console.log(username);
    console.log(password);
    return done(null, false, { message: 'Nobody here by that name'} );
  }
  else
  {
    //done(null, false);
    console.log(username);
    console.log(password);
    return done(null, false, { message: 'Wrong password'} );
    
  }
}));
*/

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


passport.serializeUser(function(user, done) { 
  // please read the Passport documentation on how to implement this. We're now
  // just serializing the entire 'user' object. It would be more sane to serialize
  // just the unique user-id, so you can retrieve the user object from the database
  // in .deserializeUser().
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  // Again, read the documentation.
  done(null, user);
});