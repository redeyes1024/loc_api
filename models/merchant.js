/**
 * Created by Danil Skripnikov on 2016-11-18.
 */
'use strict';
var db = require('../lib/db.js');

module.exports.getByIds = function (ids, partner, done) {
    db.get(db.READ, function (err, connection) {
        if (err) return done(err);

        let sqlOptions = {
            sql: 'SELECT w.merchant_id,p.api_name,w.external_id FROM whitelist w inner join partner p on w.partner_id=p.id ' +
            ' where p.is_active = 1 and ' +
            ' p.is_visible =1 and w.merchant_id in (?) and w.deleted_at IS NULL and ' +
            (partner ? ' p.api_name = ? and ' : '') + ' w.deleted_at IS NULL ',
            nestTables: false
        };

        connection.query(sqlOptions, [ids], function (err, rows) {
            if (err) return done(err);
            done(null, rows);
        })
    })
};