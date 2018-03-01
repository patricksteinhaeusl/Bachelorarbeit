'use strict';

appControllers.controller('CommunityController', ['$scope', '$location', 'CommunityService', 'AuthService', function($scope, $location, communityService, AuthService) {
  const self = this;
  self.data = {};
  self.data.post = {};
  self.data.postImage = {};
  self.data.progress = 0;
  self.error = false;

  self.insert = function() {
    self.data.post._account = AuthService.getUser()._id;
    communityService.insert(self.data.post, self.data.postImage, function(error, data) {
      if(error) self.error = true;
      else if(data) {
        $location.path('/home');
      }
    }, function(progress) {
      self.data.progress = progress;
    });
  };

}]);
