'use strict';

const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailer');

router.get('/order/:orderId/change/', retailerController.change);

module.exports = router;
