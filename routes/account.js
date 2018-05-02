'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const multer = require('multer');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');
const ResponseUtil = require('../utils/response');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype !== 'text/html') {
            return callback('Only html files are allowed!');
        }
        return callback(null, true);
    }}).single('profile');

router.get('/:accountId', jwt(GlobalConfig.auth.validateOptions), accountController.get);
router.put('/', jwt(GlobalConfig.auth.validateOptions), accountController.update);
router.post('/profile', jwt(GlobalConfig.auth.validateOptions), function(req, res, callback) {
    upload(req, res, function (error) {
        if(error) {
            return res.json(ResponseUtil.createErrorResponse(error));
        }
        return callback();
    });
}, accountController.upload);

module.exports = router;
