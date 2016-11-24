'use strict';
const Partner = require('../partner');


module.exports = class DinetoPartner extends Partner {

    getSummary(id, filters) {
        let self = this;
        return this.client.get({
            'lang': filters.lang,
            'estid': id,
            'format': 'json',
            'type': 'text',
            'key': this.client.configuration.key
        }).then(function (result) {
            let data = JSON.parse(result);
            if (!Array.isArray(data))
                return Promise.reject(result);
            let optimizedResults = {
                'partnerId': data[0].id,
                'menusCounts': 0,
                'has_online_ordering': data[0].has_online_ordering || false,
                'has_delivery': data[0].has_delivery || false,
                'has_pickup': data[0].has_pickup || false,
                'url': data[0].url || false,
                'online_ordering_url': data[0].online_ordering_url || false,
                'trackphone': data[0].trackphone || ''
            };
            return Promise.resolve({"partner": "dineto", "data": optimizedResults});
        }).catch(function (err) {
            return Promise.reject(err);
        });

    };

};