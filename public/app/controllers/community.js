'use strict';

appControllers.controller('CommunityController', ['$rootScope', '$scope', '$location', 'PostService', 'AuthService',
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
            $rootScope.messages = {};
            PostService.insertUpload(self.data.post, self.data.postImage, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.post = {};
                    $rootScope.messages.success = message;
                    $location.path('/home');
                }
            }, function (progress) {
                self.data.progress = progress;
            });
        };

        self.insertURL = function () {
            self.data.post._account = AuthService.getUser()._id;
            $rootScope.messages = {};
            PostService.insertURL(self.data.post, self.data.url, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.post = {};
                    $rootScope.messages.success = message;
                    $location.path('/home');
                }
            });
        };
}]);
