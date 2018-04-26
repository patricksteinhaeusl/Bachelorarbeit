'use strict';

appControllers.controller('CommunityController', ['$rootScope', '$scope', '$location', 'PostService', 'AuthService',
    function ($rootScope, $scope, $location, PostService, AuthService) {
        const self = this;
        self.data = {};
        self.data.post = {};
        self.data.postImage = {};
        self.data.progress = 0;

        self.insert = function () {
            self.data.post._account = AuthService.getUser()._id;
            $rootScope.messages = {};
            PostService.insert(self.data.post, self.data.postImage, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
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
}]);
