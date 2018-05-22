'use strict';

appServices.factory('CreditCardService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getByNumber(creditCardNumber, callback) {
            $http
                .get('/api/creditcard/' + creditCardNumber)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        update(creditCard, callback) {
            let data = {creditCard: creditCard};
            $http
                .put('/api/creditcard/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        insert(creditCard, callback) {
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
