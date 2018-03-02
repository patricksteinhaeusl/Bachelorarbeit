'use strict';

const GlobalConfig = require('../configs/index');
const LogUtil = require('../utils/log');
const fs = require('fs');
const path = require('path');
const Post = require('../models/post');

let data = {
    drop: function (callback) {
        Post.remove({}, function (err) {
            if (err) LogUtil.writeError(err);
            LogUtil.writeInfo('Post removed');

            fs.readdir(GlobalConfig.postImages.directory, (error, files) => {
                if (error) throw error;

                for (const file of files) {
                    if (GlobalConfig.postImages.defaultImages.indexOf(file.toLowerCase()) === -1) {
                        fs.unlink(path.join(GlobalConfig.postImages.directory, file), error => {
                            if (error) throw error;
                            LogUtil.writeInfo('Post Image removed');
                        });
                    }
                }
                return callback();
            });
        });
    },
    create: function (callback) {

// Post 0
        new Post({
            title: 'Awesome product',
            text: 'This is one of the best bells.',
            image: 'schelbert-froschmaultreicheln.jpg'
        })
            .save(function (err) {
                if (err) LogUtil.writeError(err);
                LogUtil.writeInfo('Post 0 saved');

// Post 1
                new Post({
                    title: 'Just genius',
                    text: 'This bell is genius. My cows love this bell!',
                    image: 'zurfluh-bissen.jpg'
                })
                    .save(function (err) {
                        if (err) LogUtil.writeError(err);
                        LogUtil.writeInfo('Post 1 saved');

// Post 2
                        new Post({
                            title: 'Individual bells',
                            text: 'I ordered my individual bell!',
                            image: 'steiner-innenschweiz.jpg'
                        })
                            .save(function (err) {
                                if (err) LogUtil.writeError(err);
                                LogUtil.writeInfo('Post 2 saved');
                                return callback();
                            });
                    });
            });
    }
};

module.exports = data;
