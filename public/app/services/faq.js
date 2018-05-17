'use strict';

appServices.factory('FaqService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        getFaq: function (callback) {
            $http
                .get('/api/faq')
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },

        getFaqBySearchValue: function (searchValue, callback) {
            let data = {searchValue: searchValue};
            $http
                .post('/api/faq/searchValue/', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
    };
}]);
