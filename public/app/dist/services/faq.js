'use strict';

appServices.factory('FaqService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getFaq: function getFaq(callback) {
            $http.get('/api/faq').then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        getFaqBySearchValue: function getFaqBySearchValue(searchValue, callback) {
            var data = { searchValue: searchValue };
            $http.post('/api/faq/searchValue/', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);