'use strict';
var route = require('express').Router();

route.get('/', function(req, res, next) {
    res.json({ message: "User API" });
});

module.exports = route;