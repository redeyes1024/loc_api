'use strict';
const Partner = require('../partner');

module.exports = class OpisPartner extends Partner {

    getSummary(options) {
        return Promise.resolve({"partner": "opis", "data": "You can do that!"});
    };

};