var combo   = require('combohandler'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    state   = require('express-state'),

// -- Add in requires for express
	passport   = require('passport');
	flash = require('flash');
	LocalStrategy = require('passport-local').Strategy;
	ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
	Sequelize = require('sequelize');

    config     = require('./config'),
    helpers    = require('./lib/helpers'),
    middleware = require('./middleware'),
    routes     = require('./routes'),

    app = express();

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

// -- Passport Configuration 
//var Account = require('./models/account');
	//passport.use(new LocalStrategy(Account.authenticate()));
	//passport.serializeUser(Account.serializeUser());
	//passport.deserializeUser(Account.deserializeUser());

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
app.use(express.cookieSession(config.session));
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
app.use(express.bodyParser());
app.use(flash());
app.use(express.session({ secret: 'super secret'}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

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

//app.get('/wedding/', routes.render('wedding'));

//app.get('/logistics/',         routes.render('logistics'));
//app.get('/logistics/hotels/',  routes.render('logistics/hotels'));
//app.get('/logistics/outings/', routes.render('logistics/outings'));

//app.get('/registry/', routes.render('registry'));
/// Modified to use auth. 
app.get('/registry/',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });

app.get('/wedding/',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });
  
app.get('/logistics/',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
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

module.exports = app;
