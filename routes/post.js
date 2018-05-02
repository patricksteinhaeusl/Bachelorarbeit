'use strict';

const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');
const crypto = require('crypto');
const multer = require('multer');
const mime = require('mime');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');
const ResponseUtil = require('../utils/response');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, GlobalConfig.postImages.directory)
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            return callback(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const regEx = new RegExp("image");
        if (!regEx.test(file.mimetype)) {
            return callback('Only image files are allowed!');
        }
        return callback(null, true);
    }
}).single('postImage');

router.get('/', PostController.getAll);
router.post('/', jwt(GlobalConfig.auth.validateOptions), function(req, res, callback) {
    upload(req, res, function (error) {
        if(error) {
            return res.json(ResponseUtil.createErrorResponse(error));
        }
        return callback();
    });
}, PostController.insert);
router.delete('/:postId', jwt(GlobalConfig.auth.validateOptions), PostController.remove);

module.exports = router;
