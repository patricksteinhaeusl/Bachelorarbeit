'use strict';

appServices.factory('OrderService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getTemp: function getTemp(accountId, callback) {
            $http.get('/api/order/temp/account/' + accountId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        createTemp: function createTemp(items, totalPrice, account, callback) {
            var data = { items: items, totalPrice: totalPrice, account: account };
            $http.post('/api/order/temp/create', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        updateTemp: function updateTemp(order, callback) {
            var data = { 'order': order };
            $http.put('/api/order/temp', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        save: function save(order, callback) {
            var data = { 'order': order };
            $http.post('/api/order', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);