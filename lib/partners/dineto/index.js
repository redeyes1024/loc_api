'use strict';
const Partner = require('../partner');
const _ = require('lodash');

module.exports = class DinetoPartner extends Partner {

    getSummary(options){
        let self = this;
        return this.client.get({
            'query': 'movie',
            'lang': options.lang,
            'estid': options.merchant_id,
            'format':'json',
            'type':'text',
            'key':''
        })

    };

    findMovie(language, movieId) {
        let self = this;
        return this.client.get({
            'query': 'movie',
            'lang': language,
            'movie_id': movieId
        })
            .then(function (xml) {
                var movies = self.convertXmlToJson(xml);
                let movie = _.get(movies, "movies.movie", null);
                if (!movie) return Promise.reject(new Error("Movie not found"));
                return Promise.resolve(movie);
            })
            .catch(function (err) {
                return Promise.reject(err);
            });
    };

};