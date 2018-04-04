'use strict';

appServices.factory('DeliveryAddressesService', ['$http', function ($http) {
    return {
        getAllByAccount: function (account, callback) {
            $http
                .get('/api/deliveryaddress/account/' + account._id)
                .then(function (response) {
                    let deliveryAddresses = response.data.data.deliveryAddresses;
                    if (deliveryAddresses) {
                        return callback(deliveryAddresses);
                    } else {
                        return callback(false);
                    }
                }, function (response) {
                    return callback(false);
                });
        },
        remove: function (deliveryAddressId, callback) {
            $http
                .delete('/api/deliveryaddress/' + deliveryAddressId)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        return callback(null, null, message, null);
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
