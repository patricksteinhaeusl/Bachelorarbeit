'use strict';

appServices.factory('FaqService', ['$http', '$q', function ($http, $q) {
    return {
        getFaq: function (callback) {
            $http
                .get('/api/faq')
                .then(function (response) {
                    let faqQuestions = response.data.data.faq;
                    return callback(faqQuestions);
                }, function (response) {
                    return callback(false);
                });
        },
        getFaqBySearchValue: function (searchValue, callback) {
            let data = {searchValue: searchValue};
            $http
                .post('/api/faq/searchValue/', data)
                .then(function (response) {
                    let faqQuestions = response.data.data.products;
                    return callback(faqQuestions);
                }, function (response) {
                    return callback(false);
                });
        },
    };
}]);
