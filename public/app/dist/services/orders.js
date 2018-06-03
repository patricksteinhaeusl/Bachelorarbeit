'use strict';

appServices.factory('OrdersService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount: function getAllByAccount(accountId, callback) {
            $http.get('/api/order/account/' + accountId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        getFromTo: function getFromTo(from, range, callback) {
            $http.get('/api/order/from/' + from + '/range/' + range).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);