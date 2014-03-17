var pg = require('pg'),

    config = require('../config'),

    GUEST_BY_ID    = 'SELECT * FROM guests WHERE id=$1 LIMIT 1',
    GUEST_BY_EMAIL = 'SELECT * FROM guests WHERE email=$1 LIMIT 1',
    UPDATE_GUEST   = 'UPDATE guests SET $UPDATES WHERE email=$1',

    UPDATE_SCHEMA = {
        title              : true,
        name               : true,
        is_attending       : true,
        is_attending_brunch: true,
        meal               : true,
        allergies		   : true,
        food_pref		   : true,
        total_attending	   : true,
        attending_names	   : true
    };


var conString = "postgres://localhost/open-marriage";

var client = new.Client(conString);
client.connect();

//Setup a query. 
var query = client.query("SELECT * FROM guests ORDER BY id");
query.on("row", function (row, result) {
	result.addRow(row);
});

query.on("end", function (result) {
	console.log(JSON.stringify(result.rows, null "  "));
	client.end();
});
