/**
 * Created by Danil Skripnikov on 2016-11-21.
 */
'use strict';
const async = require('async');
var config = require('../config')();
var Partners = {
    "westworldmedia_cinema": require('./partners/cinema'),
    "foursquare": require('./partners/foursquare'),
    "dineto": require('./partners/dineto'),
    "opis": require('./partners/opis'),
    "tripadvisor": require('./partners/tripadvisor'),
    "bookenda": require('./partners/bookenda'),
    "youtube": require('./partners/youtube'),
    "trip_advisor": require('./partners/tripadvisor'),
    "wayway": require('./partners/wayway')


};


module.exports = class MultiClient {
    constructor() {
        this.queue = 0;
        this.result = {};
    }

    getSummary(filters, parnters, callback) {
        let self = this;
        let result = {};
        async.each(parnters, function (partner) {
            self._addQueue(partner.api_name);
            var client = new Partners[partner.api_name](config.partners[partner.api_name]);
            client.getSummary(partner.external_id, filters)
                .then(function (data) {
                        self._removeQueue(data.partner);
                        self.result[data.partner] = data.data;
                        if (self.queue == 0) {
                            callback(null, self.result);
                        }
                    }
                    , function (err) {
                        console.log('Error occured: ' + err);
                        callback(err);
                    });

        })
    }

    _addQueue(partner) {
        this.queue++;
        console.log(`Request for partnet '${partner}' added to queue.`);
    }

    _removeQueue(partner) {
        this.queue--;
        console.log(`Request for partnet '${partner}' removed from queue.`);
    }
};
