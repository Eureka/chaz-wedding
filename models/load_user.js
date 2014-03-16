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

