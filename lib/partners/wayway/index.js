'use strict';
const Partner = require('../partner');


module.exports = class WaywayPartner extends Partner {

    getSummary(options) {
        return Promise.resolve({"partner": "wayway", "data": "You can do that!"});

    };

};