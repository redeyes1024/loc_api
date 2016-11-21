/**
 * Created by Danil Skripnikov on 2016-11-18.
 */
;
var mysql = require('mysql')
    , async = require('async')
    , config = require('../config')();


var state = {
    pool: null
};

module.exports.connect = function (done) {

    state.pool = mysql.createPoolCluster();

    state.pool.add('WRITE', config.db.master);
    config.db.slaves.forEach(function (slave) {
        state.pool.add(`READ${Math.random()}`, slave);
    });

    done()
}

module.exports.READ = 'read'
module.exports.WRITE = 'write'

module.exports.get = function (type, done) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    if (type === exports.WRITE) {
        state.pool.getConnection('WRITE', function (err, connection) {
            if (err) return done(err)
            done(null, connection)
        })
    } else {
        state.pool.getConnection('READ*', function (err, connection) {
            if (err) return done(err)
            done(null, connection)
        })
    }
}