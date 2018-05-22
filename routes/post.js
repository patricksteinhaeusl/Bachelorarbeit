'use strict';

const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/', PostController.getAll);
router.post('/upload', jwt(GlobalConfig.auth.validateOptions), PostController.uploadFile, PostController.insertUpload);
router.post('/url', jwt(GlobalConfig.auth.validateOptions), PostController.insertURL);
router.delete('/:postId', jwt(GlobalConfig.auth.validateOptions), PostController.remove);

module.exports = router;
