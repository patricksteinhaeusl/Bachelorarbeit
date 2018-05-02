'use strict';

appServices.factory('PostService', ['$http', 'Upload', function ($http, Upload) {
    return {
        getAll: function (callback) {
            $http
                .get('/api/post')
                .then(function (response) {
                    let posts = response.data.data.posts;

                    if (posts) {
                        return callback(posts);
                    } else {
                        return callback(false);
                    }
                }, function (response) {
                    return callback(false);
                });
        },
        insertUpload: function (post, postImage, callback, callbackEvent) {
            let data = {postImage: postImage, post: post};
            Upload.upload({
                url: '/api/post/upload',
                data: data,
            }).then(function (response) {
                let statusCode = response.data.statusCode;
                let data = response.data.data;
                let message = response.data.message;
                let validations = response.data.validations;
                if (statusCode === 200) {
                    let post = data.post;
                    let responseData = {post: post};
                    return callback(null, responseData, message, null);
                } else if (statusCode === 405) {
                    return callback(null, null, null, validations);
                }
                return callback(null, null, message, null);
            }, function (error) {
                return callback(error);
            }, function (event) {
                let progressPercentage = parseInt(100 * event.loaded / event.total);
                return callbackEvent(progressPercentage);
            });
        },
        insertURL: function (post, url, callback, callbackEvent) {
            let data = {url: url, post: post};
            $http
                .post('/api/post/url', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let url = data.url;
                        let responseData = {url: url};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    } else if (statusCode === 500) {
                        return callback(message, null, null, null);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
        remove: function (postId, callback) {
            $http
                .delete('/api/post/' + postId)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let responseData = null;
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        }
    };
}]);
