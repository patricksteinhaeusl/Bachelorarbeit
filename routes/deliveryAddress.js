'use strict';

const express = require('express');
const router = express.Router();
const deliveryAddressController = require('../controllers/deliveryAddress');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/account/:accountId', jwt(GlobalConfig.auth.validateOptions), deliveryAddressController.getByAccountId);
router.get('/:deliveryAddressId/account/:accountId', jwt(GlobalConfig.auth.validateOptions), deliveryAddressController.get);
router.delete('/:deliveryAddressId', jwt(GlobalConfig.auth.validateOptions), deliveryAddressController.remove);
router.put('/', jwt(GlobalConfig.auth.validateOptions), deliveryAddressController.update);
router.post('/', jwt(GlobalConfig.auth.validateOptions), deliveryAddressController.insert);

module.exports = router;
