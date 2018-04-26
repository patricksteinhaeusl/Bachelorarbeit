'use strict';

const Post = require('../models/post');
const ResponseUtil = require('../utils/response');
const fs = require('fs');
const GlobalConfig = require('../configs/index');

function getAll(callback) {
    Post.find({}).populate('_account').exec(function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'posts': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function insert(post, callback) {
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
    insert,
    remove
};
