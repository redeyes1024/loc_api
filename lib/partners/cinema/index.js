'use strict';
const Partner = require('../partner');
const _ = require('lodash');
//const parser = require('xml2json');

module.exports = class CinemaPartner extends Partner {

    getSummary(options) {
        return Promise.resolve({"partner": "westworldmedia_cinema", "data": "You can do that!"});

    };

};