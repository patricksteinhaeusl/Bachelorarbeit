'use strict';

appServices.factory('CreditCardsService', ['$http', function ($http) {
    return {
        getAllByAccount: function (account, callback) {
            $http
                .get('http://localhost:3000/api/creditcard/account/' + account._id)
                .then(function (response) {
                    let creditCards = response.data.data.creditCards;
                    if (creditCards) {
                        return callback(creditCards);
                    } else {
                        return callback(false);
                    }
                }, function (response) {
                    return callback(false);
                });
        },
        remove: function (creditCardId, callback) {
            $http
                .delete('http://localhost:3000/api/creditcard/' + creditCardId)
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
