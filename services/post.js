'use strict';

const Post = require('../models/post');
const ResponseUtil = require('../utils/response');
const fs = require('fs');
const download = require('image-downloader');
const crypto = require('crypto');
const urlParse = require("url");
const path = require("path");
const GlobalConfig = require('../configs/index');

function getAll(callback) {
    Post.find({}).populate('_account').exec(function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'posts': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function insertUpload(post, callback) {
    let postObj = new Post(post);
    postObj.validate(function (error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        postObj.save(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error));
            if (!result) return callback(ResponseUtil.createNotFoundResponse());
            result = {'post': result};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Post successfully created.'));
        });
    });
}

function insertURL(post, url, callback) {
    let parsedFile = "";
    try {
        parsedFile = path.parse(urlParse.parse(url).pathname);
    } catch (err) {
        return callback(ResponseUtil.createErrorResponse('Not a valid URL'));
    }
    let extension = parsedFile.ext;
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.gif' && extension !== '.png') {
        return callback(ResponseUtil.createErrorResponse('Only jpg, jpeg, gif and png are allowed'));
    }
    let scrambledFileName = crypto.randomBytes(16).toString('hex');
    post.image = "";
    const options = {
        url: url,
        dest: GlobalConfig.postImages.directory + scrambledFileName + extension
    };
    download.image(options)
        .then(({}) => {
            post.image = scrambledFileName + extension;
            let postObj = new Post(post);
            postObj.validate(function (error) {
                if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
                postObj.save(function (error, result) {
                    if (error) return callback(ResponseUtil.createErrorResponse(error));
                    if (!result) return callback(ResponseUtil.createNotFoundResponse());
                    result = {'post': result};
                    return callback(null, ResponseUtil.createSuccessResponse(result, 'Post successfully created.'));
                });
            });
        }).catch(() => {
        return callback(ResponseUtil.createErrorResponse('Could not fetch image from given URL'));
    });
}

function remove(postId, callback) {
    Post.findById(postId, function (error, post) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));

        fs.unlink(GlobalConfig.postImages.directory + post.image, function() {
            post.remove(function(error) {
                return callback(null, ResponseUtil.createSuccessResponse(null, 'Post successfully deleted.'));
            });
        });
    });
}

module.exports = {
    getAll,
    insertUpload,
    insertURL,
    remove
};
