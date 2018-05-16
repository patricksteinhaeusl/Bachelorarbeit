'use strict';

const express = require('express');
const ssrf = express();

ssrf.use(express.static(__dirname + '/public/ssrf'));
ssrf.disable('x-powered-by');


// catch 404 and forward to error handler
ssrf.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;

    if(process.env.NODE_ENV === 'production') {
        res.redirect('/index.hmtl');
    }

    next(err);
});

// error handler
ssrf.use(function (err, req, res) {
    if(process.env.NODE_ENV === 'development') {
        res.locals.message = err.message;
        res.status(err.status || 500);
        res.send(err.message);
    }
    res.status(500);
    res.send('An error occurred!');
});

module.exports = ssrf;

