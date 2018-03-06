'use strict';

appServices.factory('PostService', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            $http
                .get('http://localhost:3000/api/post')
                .then(function (response) {
                    let posts = response.data.data.posts;

                    if (posts) {
                        return callback(posts);
                    } else {
                        return callback(false);
                    }
                }, function (response) {
                    return callback(false);
                });
        }
    };
}]);
