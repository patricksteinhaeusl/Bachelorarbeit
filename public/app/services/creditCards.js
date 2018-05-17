'use strict';

appServices.factory('CreditCardsService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount: function (account, callback) {
            $http
                .get('/api/creditcard/account/' + account._id)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        remove: function (creditCardId, callback) {
            $http
                .delete('/api/creditcard/' + creditCardId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
