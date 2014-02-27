	var Sequelize = require('../sequelize');
	var PassportLocalStrategy = require('../passport-local').Strategy;
    var passport = require("../passport");

var sequelize = new Sequelize ('open-marriage', 'postgres', null, {
	dialect: 'postgres'
});
	
var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.sync();