'use strict';

appServices.factory('FaqService', ['$http', function ($http) {
    return {
        getFaq: function (callback) {
            $http
                .get('/api/faq')
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        return callback(null, data.faq, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    } else if (statusCode === 500) {
                        return callback(message, null, null, null);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },

        getFaqBySearchValue: function (searchValue, callback) {
            let data = {searchValue: searchValue};
            $http
                .post('/api/faq/searchValue/', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        return callback(null, data.faq, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    } else if (statusCode === 500) {
                        return callback(message, null, null, null);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
    };
}]);
