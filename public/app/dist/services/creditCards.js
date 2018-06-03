'use strict';

appServices.factory('CreditCardsService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getAllByAccount: function getAllByAccount(account, callback) {
            $http.get('/api/creditcard/account/' + account._id).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        remove: function remove(creditCardId, callback) {
            $http.delete('/api/creditcard/' + creditCardId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);