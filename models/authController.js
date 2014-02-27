var passport = require('passport');
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