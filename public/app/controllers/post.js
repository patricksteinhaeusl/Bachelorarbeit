'use strict';

appControllers.controller('PostController', ['$rootScope', '$scope', '$location', 'PostService', 'AuthService',
    function ($rootScope, $scope, $location, PostService, AuthService) {
        const self = this;
        self.data = {};
        self.data.post = {};
        self.data.url = "";
        self.data.postImage = {};
        self.data.progress = 0;
        self.error = false;
        self.type = 0;

        self.insert = function () {
            switch (self.type) {
                case 1:
                    self.insertUpload();
                    break;
                case 2:
                    self.insertURL();
                    break;
                default:
                    $rootScope.messages = {};
                    $rootScope.messages.error = "No Type selected";
                    break;
            }
        };

        self.insertUpload = function () {
            self.data.post._account = AuthService.getUser()._id;
            PostService.insertUpload(self.data.post, self.data.postImage, function (error, data) {
                if(!error) {
                    self.data.post = {};
                    $location.path('/home');
                }
            }, function (progress) {
                self.data.progress = progress;
            });
        };

        self.insertURL = function () {
            self.data.post._account = AuthService.getUser()._id;
            PostService.insertURL(self.data.post, self.data.url, function (error, data) {
                if(!error) {
                    self.data.post = {};
                    $location.path('/home');
                }
            });
        };
}]);
