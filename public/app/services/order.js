'use strict';

appServices.factory('OrderService', ['$http', function ($http) {
    return {
        getTemp: function (accountId, callback) {
            $http
                .get('/api/order/temp/account/' + accountId)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data.order;
                    let message = response.data.message;
                    if (statusCode === 200) {
                        let responseData = {order: data};
                        return callback(null, responseData, message);
                    }
                    return callback(null, null, message);
                }, function (error) {
                    return callback(error);
                });
        },
        createTemp: function (items, totalPrice, account, callback) {
            let data = {items: items, totalPrice: totalPrice, account: account};
            $http
                .post('/api/order/temp/create', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data.order;
                    let message = response.data.message;
                    if (statusCode === 200) {
                        let responseData = {order: data};
                        return callback(null, responseData, message);
                    }
                    return callback(null, null, message);
                }, function (error) {
                    return callback(error);
                });
        },
        updateTemp: function (order, callback) {
            let data = {'order': order};
            $http
                .put('/api/order/temp', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data.order;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let responseData = {order: data};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
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
                        let order = data.order;
                        let responseData = {order: data};
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
