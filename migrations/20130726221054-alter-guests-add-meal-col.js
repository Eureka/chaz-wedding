var async = require('async'),
    dbm   = require('db-migrate'),
    type  = dbm.dataType;

exports.up = function (db, callback) {
    async.series([
        db.addColumn.bind(db, 'guests', 'meal', {
            type  : 'string',
            length: 32
        }),

        db.runSql.bind(db,
            "ALTER TABLE guests " +
            "ADD CONSTRAINT meal CHECK (meal IN ('vegan', 'vegetarian', 'none'));")
    ], callback);
};

exports.down = function (db, callback) {
    db.removeColumn('guests', 'meal', callback);
};
