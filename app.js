'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const forceSSL = require('express-force-ssl');
const cors = require('cors');
const compression = require('compression');


require('./utils/mongo');

const api = require('./routes/api');
const auth = require('./routes/auth');
const account = require('./routes/account');
const creditCard = require('./routes/creditCard');
const deliveryAddress = require('./routes/deliveryAddress');
const order = require('./routes/order');
const product = require('./routes/product');
const post = require('./routes/post');
const retailer = require('./routes/retailer');
const faq = require('./routes/faq');

const app = express();

app.set('view engine', 'pug');

app.use(compression());
app.use(cors());
app.use(forceSSL);
app.use(logger('dev'));
app.use(bodyParser.json({'strict': true}));
app.disable('x-powered-by');

app.use(express.static(__dirname + '/public/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/styles', express.static(__dirname + '/assets/styles'));
app.use('/fonts', express.static(__dirname + '/assets/fonts'));
app.use('/product-images', express.static(__dirname + '/assets/product-images'));
app.use('/profile-images', express.static(__dirname + '/assets/profile-images'));
app.use('/post-images', express.static(__dirname + '/assets/post-images'));
app.use('/slider-images', express.static(__dirname + '/assets/slider-images'));
app.use('/favicon.ico', express.static(__dirname + '/assets/favicon.ico'));

app.use('/api', api);
app.use('/api/auth', auth);
app.use('/api/account', account);
app.use('/api/creditCard', creditCard);
app.use('/api/deliveryAddress', deliveryAddress);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/post', post);
app.use('/api/retailer', retailer);
app.use('/api/faq', faq);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('404 - Not Found');
    err.status = 404;

    next(err);
});

// error handler
app.use((err, req, res) => {
    if(process.env.NODE_ENV === 'development') {
        res.locals.message = err.message;
        res.status(err.status || 500);
        res.send(err.message);
    }
    res.status(500);
    res.send('An error occurred!');
});

module.exports = app;
