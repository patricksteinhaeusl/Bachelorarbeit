'use strict';

appServices.factory('CommunityService', ['$http', '$q', 'Upload', function ($http, $q, Upload) {
  return {
    insert: function(post, postImage, callback, callbackEvent) {
      let data = {postImage: postImage, post: post};
      Upload.upload({
        url: 'http://localhost:3000/api/post',
        data: data,
      }).then(function(response) {
        let post = response.data.data.post;
        return callback(null, post);
      }, function (error) {
        return callback(error);
      }, function (event) {
        let progressPercentage = parseInt(100.0 * event.loaded / event.total);
        return callbackEvent(progressPercentage);
      });
    }
  }
}]);
