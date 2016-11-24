'use strict';
const Client = require('../client');
module.exports = class Partner {
    constructor(configuration) {
        this.client = new Client(configuration);
    }
};