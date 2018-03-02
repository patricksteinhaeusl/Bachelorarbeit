'use strict';

const PostService = require('../services/post');

function getAll(req, res) {
    PostService.getAll((error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function insert(req, res) {
    let post = req.body.post;
    post.image = req.file.filename;
    PostService.insert(post, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

module.exports = {
    getAll,
    insert
};
