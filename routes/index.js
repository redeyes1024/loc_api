'use strict';
var users = require('./users');
var partner = require('./partner');
module.exports = function(app) {

    app.use('/api/users', users);
    app.use('/api/partner', partner);
}