'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./controllers/index');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', routes);

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
}


app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

module.exports = app;