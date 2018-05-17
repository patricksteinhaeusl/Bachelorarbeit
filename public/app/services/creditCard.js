'use strict';

appServices.factory('CreditCardService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getByNumber: function (creditCardNumber, callback) {
            $http
                .get('/api/creditcard/' + creditCardNumber)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        update: function (creditCard, callback) {
            let data = {creditCard: creditCard};
            $http
                .put('/api/creditcard/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        insert: function (creditCard, callback) {
            let data = {creditCard: creditCard};
            $http
                .post('/api/creditcard/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
