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
    Post.find({}).populate({
        path: '_account',
        select: '_id username'
    }).exec(function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No posts found.'));
        result = {'posts': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function insertUpload(post, callback) {
    let postObj = new Post(post);
    savePost(postObj, callback);
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
            savePost(postObj, callback);
        }).catch(() => {
            return callback(ResponseUtil.createErrorResponse('Could not fetch image from given URL'));
        });
}

function remove(postId, callback) {
    Post.findById(postId, function (error, post) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        fs.unlink(GlobalConfig.postImages.directory + post.image, function() {
            post.remove(function(error) {
                if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                return callback(null, ResponseUtil.createSuccessResponse(null, 'Post successfully deleted.'));
            });
        });
    });
}

function savePost(postObj, callback) {
    postObj.validate(function (error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        postObj.save(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Post failed to save.'));
            result = {'post': result};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Post successfully created.'));
        });
    });
}

module.exports = {
    getAll,
    insertUpload,
    insertURL,
    remove
};
