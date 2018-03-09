'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const GlobalConfig = require('./configs/index');
require('./utils/mongo');

const auth = require('./routes/auth');
const account = require('./routes/account');
const creditCard = require('./routes/creditCard');
const deliveryAddress = require('./routes/deliveryAddress');
const order = require('./routes/order');
const product = require('./routes/product');
const post = require('./routes/post');
const retailer = require('./routes/retailer');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({'strict': true}));

app.use(express.static(__dirname + '/public/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/product-images', express.static(__dirname + '/assets/product-images'));
app.use('/post-images', express.static(__dirname + '/assets/post-images'));
app.use('/slider-images', express.static(__dirname + '/assets/slider-images'));
app.use('/favicon.ico', express.static(__dirname + '/assets/favicon.ico'));

app.all('/api', jwt(GlobalConfig.auth.validateOptions));

app.use('/api/auth', auth);
app.use('/api/account', account);
app.use('/api/creditCard', creditCard);
app.use('/api/deliveryAddress', deliveryAddress);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/post', post);
app.use('/api/retailer', retailer);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;

    if(req.app.get('env') === 'production') {
        res.redirect('/#!/shop');
    }

    next(err);
});

// error handler
app.use(function (err, req, res) {
    if(req.app.get('env') === 'development') {
        res.locals.message = err.message;
        res.status(err.status || 500);
        res.send(err.message);
    }
    res.status(500);
    res.send('An error occurred!');
});

module.exports = app;
