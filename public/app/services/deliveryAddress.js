'use strict';

appServices.factory('DeliveryAddressService', ['$http', function ($http) {
    return {
        getById: function (deliveryAddressId, accountId, callback) {
            $http
                .get('http://localhost:3000/api/deliveryaddress/' + deliveryAddressId + '/account/' + accountId)
                .then(function (response) {
                    let deliveryAddress;
                    if(response.data.data === null) {
                        deliveryAddress = null;
                    } else {
                        deliveryAddress = response.data.data.deliveryAddress;
                    }
                    return callback(deliveryAddress);
                }, function (response) {
                    return callback(false);
                });
        },
        update: function (deliveryAddress, callback) {
            let data = {deliveryAddress: deliveryAddress};
            $http
                .put('http://localhost:3000/api/deliveryaddress/', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let deliveryAddress = data.deliveryAddress;
                        let responseData = {deliveryAddress: deliveryAddress};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
        insert: function (deliveryAddress, callback) {
            let data = {deliveryAddress: deliveryAddress};
            $http
                .post('http://localhost:3000/api/deliveryaddress/', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let deliveryAddress = data.deliveryAddress;
                        let responseData = {deliveryAddress: deliveryAddress};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
    };
}]);
