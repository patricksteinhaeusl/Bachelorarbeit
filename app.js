'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const path = require('path');

const GlobalConfig = require('./configs/index');
const MongoUtil = require('./utils/mongo');

const auth = require('./routes/auth');
const account = require('./routes/account');
const creditCard = require('./routes/creditCard');
const deliveryAddress = require('./routes/deliveryAddress');
const order = require('./routes/order');
const product = require('./routes/product');
const post = require('./routes/post');
const retailer = require('./routes/retailer');

const app = express();

app.use(cors(GlobalConfig.cors.corsOptions));

app.use(logger('dev'));
app.use(bodyParser.json({'strict': true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/product-images', express.static(__dirname + '/assets/product-images'));
app.use('/post-images', express.static(__dirname + '/assets/post-images'));
app.use('/slider-images', express.static(__dirname + '/assets/slider-images'));
app.use('/favicon.ico', express.static(__dirname + '/assets/favicon.ico'));
app.use('/api/auth', auth);
// Injection Code Start - Unprotected REST API
app.use('/api/retailer', retailer);
// Injection Code End

app.use(expressJwt(GlobalConfig.auth.validateOptions).unless(GlobalConfig.auth.unprotectedRoutes));

app.use('/api/account', account);
app.use('/api/creditCard', creditCard);
app.use('/api/deliveryAddress', deliveryAddress);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/post', post);

app.use(function(err, req, res) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No valid token!');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
