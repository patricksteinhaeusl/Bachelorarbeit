'use strict';

const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailer');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/order/:orderId/change/', jwt(GlobalConfig.auth.validateOptions), retailerController.change);

module.exports = router;
