'use strict';

appServices.factory('CreditCardService', ['$http', function ($http) {
    return {
        getByNumber: function (creditCardNumber, callback) {
            $http
                .get('http://localhost:3000/api/creditcard/' + creditCardNumber)
                .then(function (response) {
                    let creditCard;
                    if(response.data.data === null) {
                        creditCard = null;
                    } else {
                        creditCard = response.data.data.creditCard;
                    }
                    return callback(creditCard);
                }, function (response) {
                    return callback(false);
                });
        },
        update: function (creditCard, callback) {
            let data = {creditCard: creditCard};
            $http
                .put('http://localhost:3000/api/creditcard/', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let creditCard = data.creditCard;
                        let responseData = {creditCard: creditCard};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
        insert: function (creditCard, callback) {
            let data = {creditCard: creditCard};
            $http
                .post('http://localhost:3000/api/creditcard/', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let creditCard = data.creditCard;
                        let responseData = {creditCard: creditCard};
                        return callback(null, responseData, message, null);
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
