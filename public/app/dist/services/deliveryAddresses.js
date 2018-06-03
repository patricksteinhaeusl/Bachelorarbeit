'use strict';

appServices.factory('DeliveryAddressesService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount: function getAllByAccount(account, callback) {
            $http.get('/api/deliveryaddress/account/' + account._id).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        remove: function remove(deliveryAddressId, callback) {
            $http.delete('/api/deliveryaddress/' + deliveryAddressId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);