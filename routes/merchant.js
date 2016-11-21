/**
 * Created by Danil Skripnikov on 2016-11-18.
 */
'use strict';
var route = require('express').Router();
var merchant = require('../models/merchant');

route.get('/', function (req, res, next) {

    // Validate request parameters
    req.checkQuery('merchant_id', 'Expecting array of merchant_id\'s').isIds();
    let errors = req.validationErrors();
    if (errors) {
        var err = new Error(errors);
        err.status = 400;
        return next(err);
    }
    merchant.getByIds(req.query.merchant_id,null, function (err, rows) {
        if (err) return next(err);
        res.json(rows);
    })

});

module.exports = route;