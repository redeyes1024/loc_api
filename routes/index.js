'use strict';
var users = require('./users');
module.exports = function(app) {

    app.use('/api/users', users);

}