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
    // Find all posts and populate account
    Post.find({})
        .populate({
            path: '_account',
            select: '_id username'
        }).exec((error, result) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result.length) return callback(ResponseUtil.createNotFoundResponse('No posts found.'));
            result = {'posts': result};
            return callback(null, ResponseUtil.createSuccessResponse(result));
        });
}

function insertUpload(post, callback) {
    let postObj = new Post(post);
    handleInsertPost(postObj, callback);
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
        .then(() => {
            post.image = scrambledFileName + extension;
            let postObj = new Post(post);

            handleInsertPost(postObj, callback);
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Could not fetch image from given URL'));
        });
}

function remove(postId, callback) {
    // Post find by id
    Post.findById(postId).then((post) => {
        // Remove file
        fs.unlink(GlobalConfig.postImages.directory + post.image, () => {
            // Remove Post
            post.remove().then(() => {
                return callback(null, ResponseUtil.createSuccessResponse(null, 'Post successfully deleted.'));
            }).catch((error) => {
                return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            });
        });
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function handleInsertPost(postObj, callback) {
    // Validate Post
    postObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        // Save Post
        Post.create(postObj)
            .then((post) => {
                if (!post) return callback(ResponseUtil.createNotFoundResponse('Post failed to save.'));
                const data = {'post': post};
                return callback(null, ResponseUtil.createSuccessResponse(data, 'Post successfully created.'));
            }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
    });
}

module.exports = {
    getAll,
    insertUpload,
    insertURL,
    remove
};
