'use strict';

appControllers.controller('PostController', ['$rootScope', '$scope', '$location', 'PostService', 'AuthService', function ($rootScope, $scope, $location, PostService, AuthService) {
        const self = this;
        self.data = {};
        self.data.post = {};
        self.data.url = "";
        self.data.postImage = {};
        self.data.progress = 0;
        self.error = false;
        self.type = 0;

        self.insert = () => {
            switch (self.type) {
                case 1:
                    self.insertUpload();
                    break;
                case 2:
                    self.insertURL();
                    break;
                default:
                    $rootScope.messages.warnings.push('No Type selected');
                    break;
            }
        };

        self.insertUpload = () => {
            self.data.post._account = AuthService.getUser()._id;
            PostService.insertUpload(self.data.post, self.data.postImage, self.updatePost, (progress) => {
                self.data.progress = progress;
            });
        };

        self.insertURL = () => {
            self.data.post._account = AuthService.getUser()._id;
            PostService.insertURL(self.data.post, self.data.url, self.updatePost);
        };

        self.updatePost = (error, data) => {
            if(data) {
                self.data.post = {};
                $location.path('/home');
            }
        };
}]);
