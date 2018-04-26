'use strict';

const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');
const crypto = require('crypto');
const multer = require('multer');
const mime = require('mime');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

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

const upload = multer({storage: storage}).single('postImage');

router.get('/', PostController.getAll);
router.post('/', jwt(GlobalConfig.auth.validateOptions), upload, PostController.insert);
router.delete('/:postId', jwt(GlobalConfig.auth.validateOptions), PostController.remove);

module.exports = router;
