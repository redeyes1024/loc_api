'use strict';
var argv = require('minimist')(process.argv.slice(2));
var configFile = require(__dirname + '/config.json');
var configPartnersFile = require(__dirname + '/config-partners.json');

var config = function() {
    var env = process.env.NODE_ENV || argv.env || "local";

    return configFile[env];
};

var configPartners = function(partner) {
    var env = process.env.NODE_ENV || argv.env || "local";

    return configPartnersFile[env][partner];
}

module.exports = {
    config: config,
    configPartners: configPartners
};