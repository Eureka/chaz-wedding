var combo   = require('combohandler'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    state   = require('express-state'),
	ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


    config     = require('./config'),
    helpers    = require('./lib/helpers'),
    middleware = require('./middleware'),
    routes     = require('./routes'),
    userModel  = require('./models/userModel.js'),
    AuthController = require('./models/authController.js'),

    app = express();
// Required Config additions of passport and flash
    var flash = require("connect-flash");
    var passport = require("passport");
	var Sequelize = require('sequelize');
	var PassportLocalStrategy = require('passport-local').Strategy;

// -- Configure ----------------------------------------------------------------

app.set('name', 'Charles-Fiona Wedding');
app.set('env', config.env);
app.set('port', config.port);
app.set('views', config.dirs.views);
app.set('view engine', 'hbs');
app.set('state namespace', 'YUI.Env.LE');
app.enable('strict routing');


app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname      : '.hbs',
    helpers      : helpers,
    layoutsDir   : config.dirs.layouts,
    partialsDir  : config.dirs.partials
}));

// -- Locals -------------------------------------------------------------------

app.expose(config.yui.config, 'window.YUI_config');

app.locals({
    title   : 'Charles & Fiona',
    appTitle: 'C&L Wedding',

    version    : config.version,
    yui_version: config.yui.version,

    nav: [
        {id: 'wedding',   url: '/wedding/',   label: 'Wedding'},
        {id: 'logistics', url: '/logistics/', label: 'Logistics'},
        {id: 'registry',  url: '/registry/',  label: 'Registry'},
        {id: 'rsvp',      url: '/rsvp/',      label: 'RSVP'}
    ],

    subnav: {
        logistics: [
            {id: 'logistics', url: '/logistics/',         label: 'Logistics'},
            {id: 'hotels',    url: '/logistics/hotels/',  label: 'Hotels'},
            {id: 'outings',   url: '/logistics/outings/', label: 'Outings'}
        ]
    },

    yui_module: 'le-main',

    pictos : config.pictos,
    typekit: config.typekit,

    isDevelopment: config.isDevelopment,
    isProduction : config.isProduction,

    min: config.isProduction ? '-min' : ''
});


// -- Middleware ---------------------------------------------------------------

if (config.isDevelopment) {
    app.use(express.logger('tiny'));
}

app.use(express.compress());
app.use(express.favicon(config.dirs.pub + '/favicon.ico'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(flash());
app.use(express.cookieSession(config.session));
app.use(express.session({ secret: 'super secret', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.csrf());
app.use(middleware.csrfToken);
app.use(middleware.invitation);
app.use(middleware.pjax('bare'));
app.use(middleware.checkDate);
app.use(app.router);
app.use(middleware.slash());
app.use(express.static(config.dirs.pub));
app.use(middleware.notfound);

if (config.isDevelopment) {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack     : true
    }));
} else {
    app.use(middleware.error);
}

// -- Routes -------------------------------------------------------------------

app.get('/', routes.render('home'));

//new landing page for login. 
app.get('/welcome/', routes.render('landing_page'));

app.get('/auth/login/failure', routes.render('auth/login/failure'));
app.get('/auth/login/success', routes.render('auth/login/success'));


//app.get('/wedding/', routes.render('wedding'));

//app.get('/logistics/',         routes.render('logistics'));
//app.get('/logistics/hotels/',  routes.render('logistics/hotels'));
//app.get('/logistics/outings/', routes.render('logistics/outings'));

//app.get('/registry/', routes.render('registry'));
/// Modified to use auth. 
//app.get('/registry/',
//  ensureLoggedIn, function(req, res) {
//    res.render('registry', { user: req.user});
//  });

app.get('/wedding/',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });
  
app.get('/logistics',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send(routes.render('logistics') + req.user.username);
  });
  
app.get('/logistics/hotels/',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });

app.get('/logistics/outings/',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });

//basic login page. 
app.get('/login',
  function(req, res) {
    res.redirect('/welcome/');
  });


// route to authenticate the user
app.post('/login', passport.authenticate('local', { 
  successRedirect: '/auth/login/success',
  failureRedirect: '/auth/login/failure'
}));


app.get( '/rsvp/',                       routes.rsvp.pub, routes.rsvp.edit);
app.post('/rsvp/',                       routes.rsvp.resend);
app.get( '/rsvp/brunch/',                routes.rsvp.brunch);
app.post('/rsvp/brunch/',                routes.rsvp.brunch);
app.get( '/rsvp/brunch/:invitation_key', routes.rsvp.login);
app.get( '/rsvp/:invitation_key',        routes.rsvp.login);

app.all( '/invitations/:invitation/*',       middleware.auth.ensureInvitation);
app.get( '/invitations/:invitation/',        routes.invitations.read);
app.put( '/invitations/:invitation/',        routes.invitations.update);
app.get( '/invitations/:invitation/guests',  routes.invitations.readGuests);
app.post('/invitations/:invitation/confirm', routes.invitations.confirm);

app.all('/guests/:guest/', middleware.auth.ensureGuest);
app.get('/guests/:guest/', routes.guests.read);
app.put('/guests/:guest/', routes.guests.update);

app.get('/combo/:version', [
    combo.combine({rootPath: config.dirs.pub}),
    combo.respond
]);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
//}

module.exports = app;
