'use strict';
var argv = require('minimist')(process.argv.slice(2));

var config = function() {
    var env = process.env.NODE_ENV || argv.env || "dev";

    return require(`${__dirname}/config_${env}.json`);
};

module.exports = config;