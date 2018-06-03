'use strict';

appServices.factory('PostService', ['$http', 'Upload', 'ResponseService', function ($http, Upload, ResponseService) {
    return {
        getAll: function getAll(callback) {
            $http.get('/api/post').then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        insertUpload: function insertUpload(post, postImage, callback, callbackEvent) {
            var data = { postImage: postImage, post: post };
            Upload.upload({
                url: '/api/post/upload',
                data: data
            }).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            }, function (event) {
                return ResponseService.eventCallback(event, callbackEvent);
            });
        },
        insertURL: function insertURL(post, url, callback) {
            var data = { url: url, post: post };
            $http.post('/api/post/url', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        remove: function remove(postId, callback) {
            $http.delete('/api/post/' + postId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);