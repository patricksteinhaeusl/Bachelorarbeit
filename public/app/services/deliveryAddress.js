'use strict';

appServices.factory('DeliveryAddressService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getById: function (deliveryAddressId, accountId, callback) {
            $http
                .get('/api/deliveryaddress/' + deliveryAddressId + '/account/' + accountId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        update: function (deliveryAddress, callback) {
            let data = {deliveryAddress: deliveryAddress};
            $http
                .put('/api/deliveryaddress/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        insert: function (deliveryAddress, callback) {
            let data = {deliveryAddress: deliveryAddress};
            $http
                .post('/api/deliveryaddress/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
    };
}]);
