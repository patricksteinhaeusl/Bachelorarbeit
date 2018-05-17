'use strict';

appServices.factory('PostService', ['$http', 'Upload', 'ResponseService', function ($http, Upload, ResponseService) {
    return {
        getAll: function (callback) {
            $http
                .get('/api/post')
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        insertUpload: function (post, postImage, callback, callbackEvent) {
            let data = {postImage: postImage, post: post};
            Upload.upload({
                url: '/api/post/upload',
                data: data,
            }).then(
                (response) => ResponseService.successCallback(response, callback),
                (error) => ResponseService.errorCallback(error, callback),
                (event) => ResponseService.eventCallback(event, callbackEvent)
            );
        },
        insertURL: function (post, url, callback) {
            let data = {url: url, post: post};
            $http
                .post('/api/post/url', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        remove: function (postId, callback) {
            $http
                .delete('/api/post/' + postId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
