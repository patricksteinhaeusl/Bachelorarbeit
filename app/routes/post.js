'use strict';

const express = require('express');
const router = express.Router();
const GlobalConfig = require('../configs/index');
const PostController = require('../controllers/post');
const crypto = require('crypto');
const multer  = require('multer');
const mime  = require('mime');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, GlobalConfig.postImages.directory)
  },
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      return callback(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

const upload = multer({ storage: storage }).single('postImage');

router.get('/', PostController.getAll);
router.post('/', upload, PostController.insert);

module.exports = router;
