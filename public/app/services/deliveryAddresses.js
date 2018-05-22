'use strict';

appServices.factory('DeliveryAddressesService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount(account, callback) {
            $http
                .get('/api/deliveryaddress/account/' + account._id)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        remove(deliveryAddressId, callback) {
            $http
                .delete('/api/deliveryaddress/' + deliveryAddressId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
