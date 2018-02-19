'use strict';

appServices.factory('PostService', ['$http', '$sce', function ($http, $sce) {
  return {
    getAll: function(callback) {
      $http
        .get('http://localhost:3000/api/post')
        .then(function(response) {
          let posts = response.data.data.posts;

          posts.forEach(function(post) {
            $http
              .get('http://localhost:3000/post-images/' + 'default.svg')
              .then(function(response) {

                post.safeImage = $sce.trustAs($sce.HTML, response.data);
              }, function(response) {
                return callback(false);
              });
          });

          if(posts) {
            return callback(posts);
          } else {
            return callback(false);
          }
        }, function(response) {
          return callback(false);
        });
    }
  };
}]);