'use strict';

const PostService = require('../services/post');
const multer = require('multer');
const ResponseUtil = require('../utils/response');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        return callback(null, GlobalConfig.postImages.directory)
    },
    filename: (req, file, callback) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            return callback(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

const Upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const regEx = new RegExp("image");
        if (!regEx.test(file.mimetype)) {
            return callback('Only image files are allowed!');
        }
        return callback(null, true);
    }
}).single('postImage');


function getAll(req, res) {
    PostService.getAll((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function insertUpload(req, res) {
    let post = req.body.post;
    post.image = req.file.filename;
    PostService.insertUpload(post, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function uploadFile(req, res, callback) {
    Upload(req, res, (error) => {
        if(error) {
            const errorResponse = ResponseUtil.createErrorResponse(error);
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        return callback();
    });
}

function insertURL(req, res) {
    let post = req.body.post;
    let url = req.body.url;
    PostService.insertURL(post, url, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function remove(req, res) {
    let postId = req.params.postId;
    PostService.remove(postId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    getAll,
    insertUpload,
    uploadFile,
    insertURL,
    remove
};
