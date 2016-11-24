'use strict';
const Partner = require('../partner');

module.exports = class FoursquarePartner extends Partner {

    getSummary(options) {
        return Promise.resolve({"partner": "foursquare", "data": "You can do that!"});

    };

};