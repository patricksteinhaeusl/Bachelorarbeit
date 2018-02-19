'use strict';

const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailer');

router.get('/order/change/:orderId', retailerController.change);

module.exports = router;
