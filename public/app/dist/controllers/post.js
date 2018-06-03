'use strict';

appControllers.controller('PostController', ['$rootScope', '$scope', '$location', 'PostService', 'AuthService', 'AlertsService', function ($rootScope, $scope, $location, PostService, AuthService, AlertsService) {
    var self = this;
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
                AlertsService.addWarning('No Type selected');
                break;
        }
    };

    self.insertUpload = function () {
        self.data.post._account = AuthService.getUser()._id;
        PostService.insertUpload(self.data.post, self.data.postImage, self.updatePost, function (progress) {
            self.data.progress = progress;
        });
    };

    self.insertURL = function () {
        self.data.post._account = AuthService.getUser()._id;
        PostService.insertURL(self.data.post, self.data.url, self.updatePost);
    };

    self.updatePost = function (error, data) {
        if (data) {
            self.data.post = {};
            $location.path('/home');
        }
    };
}]);