'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/:accountId', jwt(GlobalConfig.auth.validateOptions), accountController.get);
router.put('/', jwt(GlobalConfig.auth.validateOptions), accountController.update);
router.post('/profile', jwt(GlobalConfig.auth.validateOptions), accountController.insertOrUpdateProfile);
router.get('/:accountId/profile', jwt(GlobalConfig.auth.validateOptions), accountController.getProfileByAccountId);

module.exports = router;
