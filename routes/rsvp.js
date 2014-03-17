var async = require('async'),
    path  = require('path'),

    error        = require('../lib/utils').error,
    sendRsvpLink = require('../lib/email').sendRsvpLink,
    invs         = require('../lib/invitations'),
    guests       = require('../lib/guests');

    userModel  = require('../models/userModel.js'),
    AuthController = require('../models/authController.js'),

exports.pub    = pub;
exports.resend = resend;
exports.login  = login;
exports.edit   = edit;
exports.brunch = brunch;

function pub(req, res, next) {
    if (req.afterWedding) {
        delete req.session.invitation;
        return res.render('rsvp/after');
    }

 //   if (req.invitation) {
 	   if (req.user) {
 	   	console.log(req.user);
        return next();
    }

    res.locals.resent = req.session.resent;
    delete req.session.resent;

    res.render('rsvp/public');
}

function resend(req, res, next) {
	var email = req.body.email.trim();
	//console.log (req.user.email);
	//var email = req.user.email;
	
    // Always redirect to "/rsvp/" after the wedding.
    if (req.afterWedding) {
        return res.redirect('/rsvp/');
    }

    if (!email) {
        req.session.resent = {needsEmail: true};
        return res.redirect('/rsvp/');
    }

    guests.loadGuestByEmail(email, function (err, guest) {
        if (err) { return next(err); }

        if (!guest) {
            req.session.resent = {notGuest: email};
            return res.redirect('/rsvp/');
        }

        invs.loadInvitation(guest.invitation_id, function (err, invitation) {
            if (err) { return next(err); }

            sendRsvpLink(invitation, {
                guest : guest,
                resend: true
            }, function (err) {
                if (err) { return next(err); }

                req.session.resent = {sent: email};
                res.redirect('/rsvp/');
            });
        });
    });
}

function login(req, res, next) {
    var invitationId;

    // Prevent RSVP logins after the wedding has happened, and _always_ redirect
    // to "/rsvp/".
    if (req.afterWedding) {
        delete req.session.invitation;
        return res.redirect('/rsvp/');
    }

    try {
        invitationId = invs.decipherId(req.params.invitation_key);
    } catch (ex) {
        delete req.session.invitation;
        return next(error(401));
    }

    invs.loadInvitation(invitationId, function (err, invitation) {
        if (err || !invitation) {
            delete req.session.invitation;
            return next(err);
        }

        // Set the invitation on the session and redirect up one path level.
        req.session.invitation = invitationId;
        res.redirect(path.resolve(req.path, '..') + '/');
    });
}

function edit(req, res) {
    var invitation = req.invitation,
        guestsAttending, guestsNeedMeal;

    res.locals.meals = guests.MEALS;
    res.expose(guests.MEALS, 'MEALS');
 	   	console.log(req.user.id);
 	   	console.log(req.user.email);

//    if (!invitation.rsvpd) {
    if (!req.user.is_attending) {
        return res.render('rsvp/respond');
    }

    guestsAttending = req.user.some(function (guest) {
        return req.user.is_attending;
    });

    if (guestsAttending) {
        guestsNeedMeal = invitation.guests.some(function (guest) {
            return guest.is_attending && !guest.meal;
        });

        res.locals.status = guestsNeedMeal ?
            'Choose which Main Course you would like.' :
            'Everything is set with your invitation response.';

        res.render('rsvp/attending');
    } else {
        res.render('rsvp/not-attending');
    }
}

function brunch(req, res) {
    var notAttending;

    // Always redirect to "/rsvp/" after the wedding.
    if (req.afterWedding) {
        return res.redirect('/rsvp/');
    }

    if (!req.invitation) {
        return res.render('rsvp/brunch/public');
    }

    if (req.method === 'POST') {
        async.each(req.invitation.guests, function (guest, callback) {
            guests.updateGuest(guest.id, {
                is_attending_brunch: !req.body.hasOwnProperty('not-attending')
            }, callback);
        }, function (err) {
            if (err) { return next(err); }
            res.redirect(req.path);
        });

        return;
    }

    notAttending = req.invitation.guests.some(function (guest) {
        return !guest.is_attending_brunch;
    });

    if (notAttending) {
        res.render('rsvp/brunch/not-attending');
    } else {
        res.render('rsvp/brunch/respond');
    }
}
