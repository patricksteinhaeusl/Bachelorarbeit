'use strict';

const Post = require('../models/post');
const ResponseUtil = require('../utils/response');

function getAll(callback) {
  Post.find({}, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'posts' : result };
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function insert(post, callback) {
  let postObj = new Post(post);
  postObj.save(function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'post' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

module.exports = {
  getAll,
  insert
};