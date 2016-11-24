'use strict';
const Partner = require('../partner');

module.exports = class YoutubePartner extends Partner {

    getSummary(options) {
        return Promise.resolve({"partner": "youtube", "data": "You can do that!"});
    };

};