'use strict';

appServices.factory('ProductService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        get: function (productId, callback) {
            $http
                .get('/api/product/' + productId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        saveQuestion: function (productId, question, callback) {
            let data = { productId: productId, question: question };
            $http
                .post('/api/product/questions', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        }
    };
}]);
