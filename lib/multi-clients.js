/**
 * Created by Danil Skripnikov on 2016-11-21.
 */
'use strict';
const Client = require('./client');
const CinemaPartner = require('./partners/cinema');


var client = new Client(config.configPartners('dineto'));
var cinemaPartner = new CinemaPartner(client);

cinemaPartner.findMovie('en', -1)
    .then(function(movie) {
        console.log(movie);
    }, function(err){
        console.log('Error occured: ' + err);
    });
