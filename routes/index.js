'use strict';
var users = require('./users');
var merchant = require('./merchant');
module.exports = function(app) {

    app.use('/api/users', users);
    app.use('/api/merchant', merchant);
}