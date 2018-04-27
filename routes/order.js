'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.post('/temp/create', jwt(GlobalConfig.auth.validateOptions), orderController.createTemp);
router.put('/temp', jwt(GlobalConfig.auth.validateOptions), orderController.updateTemp);
router.get('/temp/account/:accountId', jwt(GlobalConfig.auth.validateOptions), orderController.getTempByAccountId);
router.get('/account/:accountId', jwt(GlobalConfig.auth.validateOptions), orderController.getByAccountId);
router.post('/', jwt(GlobalConfig.auth.validateOptions), orderController.insert);
router.delete('/:orderId', jwt(GlobalConfig.auth.validateOptions), orderController.remove);
router.get('/:orderId', jwt(GlobalConfig.auth.validateOptions), orderController.get);
router.get('/from/:from/range/:range', jwt(GlobalConfig.auth.validateOptions), orderController.getFromTo);

module.exports = router;
