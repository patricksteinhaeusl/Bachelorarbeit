'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const crypto = require('crypto');
const multer = require('multer');
const mime = require('mime');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, GlobalConfig.accountProfile.directory)
    },
    filename: function (req, file, callback) {
        let accountId = req.body.accountId;
        return callback(null, accountId + '.' + mime.getExtension(file.mimetype));
    }
});

const upload = multer({storage: storage}).single('profile');

router.get('/:accountId', jwt(GlobalConfig.auth.validateOptions), accountController.get);
router.put('/', jwt(GlobalConfig.auth.validateOptions), accountController.update);
router.post('/profile', jwt(GlobalConfig.auth.validateOptions), upload, accountController.upload);

module.exports = router;
