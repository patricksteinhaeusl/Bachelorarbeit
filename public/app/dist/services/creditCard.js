'use strict';

appServices.factory('CreditCardService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getByNumber: function getByNumber(creditCardNumber, callback) {
            $http.get('/api/creditcard/' + creditCardNumber).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        update: function update(creditCard, callback) {
            var data = { creditCard: creditCard };
            $http.put('/api/creditcard/', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        insert: function insert(creditCard, callback) {
            var data = { creditCard: creditCard };
            $http.post('/api/creditcard/', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);