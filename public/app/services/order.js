'use strict';

appServices.factory('OrderService', ['$http', '$q', function ($http, $q) {
    return {
        create: function (callback) {
            $http
                .post('/api/order/create', null)
                .then(function (response) {
                    callback(null, response.data.data.order);
                }, function (error) {
                    callback(error);
                });
        },
        save: function (order, callback) {
            let data = {'order': order};
            $http
                .post('/api/order', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data.order;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let creditCard = data.creditCard;
                        let responseData = {creditCard: creditCard};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        }
    };
}]);
