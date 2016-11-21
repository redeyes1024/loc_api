'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    routes = require('./routes');

const path = require('path');
const logger = require('morgan');
//const favicon = require('serve-favicon');

var app = express();


// Setup favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return `${msg} : ${formParam} = ${value}`;
    },
    customValidators: {
        isIds: function (values) {
            if (Array.isArray(values)) {
                return values.every(function (val) {
                    return (/^(?:[-+]?(?:0|[1-9][0-9]*))$/).test(val);
                });
            }
            else
                return false;
        }
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

routes(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;