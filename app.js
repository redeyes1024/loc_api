'use strict';
var express = require('express');

const path = require('path');
const logger = require('morgan');
//const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var config = require('./config');
var routes = require('./routes');
//const favicon = require('serve-favicon');


// let ypLoc = require('./routes/api.loc');
var app = express();
routes(app);

// Setup favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/dashboard*', express.static(path.join(__dirname, 'public', 'index.html')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;