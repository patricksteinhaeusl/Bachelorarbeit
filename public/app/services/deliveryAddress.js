'use strict';

appServices.factory('DeliveryAddressService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getById(deliveryAddressId, accountId, callback) {
            $http
                .get('/api/deliveryaddress/' + deliveryAddressId + '/account/' + accountId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        update(deliveryAddress, callback) {
            let data = {deliveryAddress: deliveryAddress};
            $http
                .put('/api/deliveryaddress/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        insert(deliveryAddress, callback) {
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
