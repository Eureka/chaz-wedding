	var Sequelize = require('sequelize');
	var PassportLocalStrategy = require('passport-local').Strategy;
    var passport = require("passport");

var sequelize = new Sequelize ('open-marriage', 'postgres', null, {
	dialect: 'postgres'
});
	
var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  fullName: Sequelize.TEXT,
  address: Sequelize.TEXT,
  allow_guests: Sequelize.INT,
  allow_children: Sequelize.BOOLEAN, defaultValue: false,
  is_attending: Sequelize.BOOLEAN,
  email_sent: Sequelize.BOOLEAN, defaultValue: false,
  meal_choice: Sequelize.ARRAY(Sequelize.TEXT)
  
});

User.sync();

module.exports = User;
