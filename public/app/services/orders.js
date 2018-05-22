'use strict';

appServices.factory('OrdersService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount(accountId, callback) {
            $http
                .get('/api/order/account/' + accountId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        getFromTo(from, range, callback) {
            $http
                .get('/api/order/from/' + from + '/range/' + range)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
