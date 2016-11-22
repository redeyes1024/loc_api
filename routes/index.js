'use strict';
var users = require('./user');
var merchant = require('./merchant');
module.exports = function(app) {

    app.use('/api/user', users);
    app.use('/api/merchant', merchant);

}