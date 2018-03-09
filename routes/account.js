'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/:accountId', accountController.get);
router.put('/', jwt(GlobalConfig.auth.validateOptions), accountController.update);

module.exports = router;
