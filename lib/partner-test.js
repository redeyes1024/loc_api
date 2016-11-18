'use strict';
const config = require('../config/config');
const Client = require('./client');
const CinemaPartner = require('./partners/cinema');

var client = new Client(config.configPartners('westworldmedia'));
var cinemaPartner = new CinemaPartner(client);

cinemaPartner.findMovie('en', -1)
  .then(function(movie) {
      console.log(movie);
  }, function(err){
    console.log('Error occured: ' + err);
});
