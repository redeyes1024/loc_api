'use strict';
const Partner = require('../partner');

module.exports = class TripadvisorPartner extends Partner {

    getSummary(options) {
        return Promise.resolve({"partner": "tripadvisor", "data": "You can do that!"});
    };

};