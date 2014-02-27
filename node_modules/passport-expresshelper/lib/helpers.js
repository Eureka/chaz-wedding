// dynamicHelpers for expressjs 2
var passporthelper = function(req, res) {
	var authObject = {};
	authObject.isAuthenticated = req.isAuthenticated();
	authObject.isUnauthenticated = req.isUnauthenticated();
	authObject.user = req.user;
	return authObject;
}
module.exports.dynamicHelpers = {auth: passporthelper};

// ensureAuthenticated middleware for express
// From: https://gist.github.com/1941301
module.exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		// Save requested url for a redirect after login
		req.session.redirect = req.url
		// Redirect to login
		res.redirect('/login');
	}
}