'use strict';
const Partner = require('../partner');
const _ = require('lodash');
const parser = require('xml2json');

module.exports = class CinemaPartner extends Partner {

    constructor(client) {
        super(client);
        this.convertXmlToJson = function(xml) {
            return JSON.parse(parser.toJson(xml));
        }
    }

    findMovie(language, movieId) {
        let self = this;
        return this.client.get({
            'query': 'movie',
            'lang': language,
            'movie_id': movieId
        })
            .then(function(xml) {
                var movies = self.convertXmlToJson(xml);
                let movie = _.get(movies, "movies.movie", null);
                if (!movie) return Promise.reject(new Error("Movie not found"));
                return Promise.resolve(movie);
            })
            .catch(function(err) {
                return Promise.reject(err);
            });
    };

};