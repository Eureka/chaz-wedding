var async = require('async'),
    dbm   = require('db-migrate'),
    type  = dbm.dataType;

exports.up = function (db, callback) {
    async.series([
        db.createTable.bind(db, 'guests', {
            columns: {
                id: {
                    autoIncrement: true,
                    primaryKey   : true,
                    type         : 'int'
                },

                invitation_id: {type: 'int'},

                title: {type: 'string', length: 8},
                name : {type: 'string', length: 64},
                email: {type: 'string', length: 128},
		password: {type: 'string', length: 16},
		groups: {type: 'string', length: 256},
		invite_key: {type: 'string', length: 8},
		allergies: {type: 'string', length: 256},
		food_pref: {type: 'string', length: 256},		

                is_attending: 'boolean',
		total_attending: {type: 'string', length: 256},
		attending_names: {type: 'string', length: 256},
                is_plusone  : {type: 'boolean', defaultValue: false}
            },

        }),

        db.runSql.bind(db,
            'ALTER TABLE guests ' +
            'ADD FOREIGN KEY (invitation_id) REFERENCES invitations;')
    ], callback);
};

exports.down = function (db, callback) {
    db.dropTable('guests', {ifExists: true}, callback);
};
