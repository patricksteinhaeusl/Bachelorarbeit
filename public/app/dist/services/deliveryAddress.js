'use strict';

appServices.factory('DeliveryAddressService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getById: function getById(deliveryAddressId, accountId, callback) {
            $http.get('/api/deliveryaddress/' + deliveryAddressId + '/account/' + accountId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        update: function update(deliveryAddress, callback) {
            var data = { deliveryAddress: deliveryAddress };
            $http.put('/api/deliveryaddress/', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        insert: function insert(deliveryAddress, callback) {
            var data = { deliveryAddress: deliveryAddress };
            $http.post('/api/deliveryaddress/', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);