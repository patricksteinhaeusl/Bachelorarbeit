'use strict';

appServices.factory('OrderService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getTemp(accountId, callback) {
            $http
                .get('/api/order/temp/account/' + accountId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        createTemp(items, totalPrice, account, callback) {
            let data = {items: items, totalPrice: totalPrice, account: account};
            $http
                .post('/api/order/temp/create', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        updateTemp(order, callback) {
            let data = {'order': order};
            $http
                .put('/api/order/temp', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        save(order, callback) {
            let data = {'order': order};
            $http
                .post('/api/order', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
