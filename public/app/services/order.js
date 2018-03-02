'use strict';

appServices.factory('OrderService', ['$http', '$q', function ($http, $q) {
    return {
        create: function (callback) {
            $http
                .post('http://localhost:3000/api/order/create', null)
                .then(function (response) {
                    callback(null, response.data.data.order);
                }, function (error) {
                    callback(error);
                });
        },
        save: function (order, callback) {
            let data = {'order': order};
            $http
                .post('http://localhost:3000/api/order', data)
                .then(function (response) {
                    return callback(null, response.data.data.order);
                }, function (error) {
                    return callback(error);
                });
        }
    };
}]);
