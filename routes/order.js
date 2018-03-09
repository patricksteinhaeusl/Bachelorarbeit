'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.post('/create', jwt(GlobalConfig.auth.validateOptions), orderController.create);
router.get('/account/:accountId', jwt(GlobalConfig.auth.validateOptions), orderController.getByAccountId);
router.put('/', jwt(GlobalConfig.auth.validateOptions), orderController.update);
router.post('/', jwt(GlobalConfig.auth.validateOptions), orderController.insert);
router.delete('/:orderId', jwt(GlobalConfig.auth.validateOptions), orderController.remove);
router.get('/:orderId', jwt(GlobalConfig.auth.validateOptions), orderController.get);

module.exports = router;
