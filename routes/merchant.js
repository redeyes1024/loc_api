/**
 * Created by Danil Skripnikov on 2016-11-18.
 */
'use strict';

const _ = require('lodash');
var route = require('express').Router();
var merchant = require('../models/merchant');



route.get('/:merchant_id', function (req, res, next) {

    // Validate required parameters
    req.check('merchant_id', 'Expecting array of merchant_id\'s').isNubber;

    // Redirect on errors
    let errors = req.validationErrors();
    if (errors) {
        var err = new Error(errors);
        err.status = 400;
        return next(err);
    }

    // Validate optional parameters
    req.sanitize('page_len').toInt;
    req.sanitize('mobile', true).toBoolean;
    let options = {
        "merchant_id": req.params.merchant_id,
        "lang": req.query.lang == 'fr' || 'en',
        "mobile": req.query.mobile,
        "page_len": isNaN(req.query.page_len) || 5
    };

    // Get DB data
    merchant.getByIds(req.params.merchant_id, null, function (err, rows) {
        if (err) return next(err);
        res.json(rows);
    })
});

route.get('/', function (req, res, next) {

    // Validate request parameters
    req.checkQuery('merchant_id', 'Expecting array of merchant_id\'s').isIds();

    // Redirect on errors
    let errors = req.validationErrors();
    if (errors) {
        var err = new Error(errors);
        err.status = 400;
        return next(err);
    }

    // Get DB data
    merchant.getByIds(req.query.merchant_id, null, function (err, rows) {
        if (err) return next(err);
        res.json(_.groupBy(rows, 'merchant_id'));
    })
});

module.exports = route;