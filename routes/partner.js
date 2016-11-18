/**
 * Created by Danil Skripnikov on 2016-11-18.
 */
'use strict';
var route = require('express').Router();

route.get('/', function (req, res, next) {
    let schema = {
        'merchant_id': {
            in: 'query',
            isIds: {
                errorMessage: 'Expecting array of merchant_id\'s'
            }
        }
    }
    req.checkQuery(schema);
    let errors = req.validationErrors();
    if (errors) {
        var notFound = new Error(errors);
        notFound.status = 400;
        return next( notFound );
    }

    res.json({message: "Users API"});
});

module.exports = route;