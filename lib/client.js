'use strict';
const rp = require('request-promise');

module.exports = class Client {

    constructor(configuration) {
        this.configuration = configuration;
    }

    get(queryString) {
        return this.request('GET', queryString);
    }

    post(queryString) {
        return this.request('POST', queryString);
    }

    request(method, queryString) {
        return rp(this.getPartnerOptions(method, queryString));
    }

    getPartnerOptions(method, queryString) {
        if (queryString.cusstomUrl) {
            return {
                method: method,
                uri: this.configuration.uri + queryString.cusstomUrl,
                headers: this.getHeaders(),
                qs: queryString
            };
        }
        return {
            method: method,
            uri: this.configuration.uri,
            headers: this.getHeaders(),
            qs: queryString
        };
    }

    getHeaders() {
        return {
            'User-Agent': this.configuration.userAgent || 'Request-Promise',
            'Authorization': this.getAuth(),
            'Accept': this.configuration.accept || "application/json"
        };
    }

    getAuth() {
        if (this.configuration.authorization)
            return this.configuration.authorization;
        else if (this.configuration.username && this.configuration.password)
            return "Basic " + new Buffer(this.configuration.username + ':' + this.configuration.password).toString("base64");
        else
            return false;
    }

};