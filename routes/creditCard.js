'use strict';

const express = require('express');
const router = express.Router();
const creditCardController = require('../controllers/creditCard');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/account/:accountId', jwt(GlobalConfig.auth.validateOptions), creditCardController.getByAccountId);
router.get('/:creditCardNumber', jwt(GlobalConfig.auth.validateOptions), creditCardController.getByNumber);
router.delete('/:creditCardId', jwt(GlobalConfig.auth.validateOptions), creditCardController.remove);
router.get('/', jwt(GlobalConfig.auth.validateOptions), creditCardController.getAll);
router.put('/', jwt(GlobalConfig.auth.validateOptions), creditCardController.update);
router.post('/', jwt(GlobalConfig.auth.validateOptions), creditCardController.insert);

module.exports = router;
