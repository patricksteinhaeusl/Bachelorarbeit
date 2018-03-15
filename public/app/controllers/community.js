'use strict';

appControllers.controller('CommunityController', ['$rootScope', '$scope', '$location', 'PostService', 'AuthService',
    function ($rootScope, $scope, $location, PostService, AuthService) {
        const self = this;
        self.data = {};
        self.data.post = {};
        self.data.postImage = {};
        self.data.progress = 0;
        self.error = false;

        self.insert = function () {
            self.data.post._account = AuthService.getUser()._id;
            $rootScope.messages = {};
            PostService.insert(self.data.post, self.data.postImage, function (error, data, message) {
                if (error) $rootScope.messages.error = error;
                $rootScope.messages.success = message;
                $location.path('/home');
            }, function (progress) {
                self.data.progress = progress;
            });
        };
}]);
