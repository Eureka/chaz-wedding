	var Sequelize = require('sequelize');
	var PassportLocalStrategy = require('passport-local').Strategy;
    	var passport = require("passport");

var sequelize = new Sequelize ('open-marriage', 'postgres', null, {
	dialect: 'postgres'
});

var User = sequelize.define('guest', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.TEXT,
  groups: Sequelize.STRING,
  title: Sequelize.STRING,
  invite_key: Sequelize.STRING,
  allergies: Sequelize.STRING,
  food_pref: Sequelize.STRING,
  total_attending: Sequelize.INTEGER,
  attending_names: Sequelize.STRING,
  is_attending: Sequelize.BOOLEAN,
  email_sent: Sequelize.BOOLEAN,
  meal: Sequelize.ARRAY(Sequelize.TEXT),

});

var Invite = sequelize.define('invitation', {
	id: Sequelize.INTEGER,
	address: Sequelize.STRING,
	rsvpd: Sequelize.BOOLEAN,
	allow_plusone: Sequelize.BOOLEAN,
	has_children: Sequelize.BOOLEAN
});

User.sync();
Invite.sync();

module.exports = User, Invite;
