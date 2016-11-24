'use strict';
const Partner = require('../partner');


module.exports = class BookendaPartner extends Partner {

    getSummary(id, filters) {
        let self = this;
        return this.client.get({
            'lang': filters.lang,
            'pageIndex': filters.lang || 0,
            'pageSize': filters.page_len || 5,
            'custtomUrl': `Merchants/${id}/Reviews`
        }).then(function (result) {
            return Promise.resolve({"partner": "bookenda", "data": JSON.parse(result)});
        }).catch(function (err) {
            return Promise.reject(err);
        });

    };

};