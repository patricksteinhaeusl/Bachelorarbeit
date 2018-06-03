'use strict';

appServices.factory('ProductService', ['$http', 'ResponseService', function ($http, ResponseService) {
    return {
        get: function get(productId, callback) {
            $http.get('/api/product/' + productId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        saveQuestion: function saveQuestion(productId, question, callback) {
            var data = { productId: productId, question: question };
            $http.post('/api/product/questions', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        }
    };
}]);