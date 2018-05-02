'use strict';

const PostService = require('../services/post');

function getAll(req, res) {
    PostService.getAll((error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function insertUpload(req, res) {
    let post = req.body.post;
    post.image = req.file.filename;
    PostService.insertUpload(post, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function insertURL(req, res) {
    let post = req.body.post;
    let url = req.body.url;
    PostService.insertURL(post, url, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function remove(req, res) {
    let postId = req.params.postId;
    PostService.remove(postId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

module.exports = {
    getAll,
    insertUpload,
    insertURL,
    remove
};
