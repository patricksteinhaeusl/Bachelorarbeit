'use strict';

appServices.factory('CreditCardsService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount(account, callback) {
            $http
                .get('/api/creditcard/account/' + account._id)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        remove(creditCardId, callback) {
            $http
                .delete('/api/creditcard/' + creditCardId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
