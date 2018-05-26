'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/:accountId', jwt(GlobalConfig.auth.validateOptions), accountController.get);
router.get('/', jwt(GlobalConfig.auth.validateOptions), accountController.getAll);
router.put('/', jwt(GlobalConfig.auth.validateOptions), accountController.update);
router.post('/profile', jwt(GlobalConfig.auth.validateOptions), accountController.uploadFile, accountController.upload);

module.exports = router;
