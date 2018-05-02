'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const multer = require('multer');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

const storage = multer.memoryStorage();

const upload = multer({storage: storage}).single('profile');

router.get('/:accountId', jwt(GlobalConfig.auth.validateOptions), accountController.get);
router.put('/', jwt(GlobalConfig.auth.validateOptions), accountController.update);
router.post('/profile', jwt(GlobalConfig.auth.validateOptions), upload, accountController.upload);

module.exports = router;
