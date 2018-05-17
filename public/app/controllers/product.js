'use strict';

appControllers.controller('ProductController', ['$scope', '$routeParams', 'AuthService', 'ProductService',
    function ($scope, $routeParams, AuthService, ProductService) {
        const self = this;

        self.data = {};
        self.data.product = {};
        self.data.question = {};

        self.init = function () {
            self.get($routeParams.productId);
        };

        self.get = function (productId) {
            ProductService.get(productId, function (error, data) {
                if (data) {
                    let product = data.product;
                    self.data.product = product;
                }
            });
        };

        self.saveQuestion = function () {
            self.data.question._account = AuthService.getUser()._id;
            ProductService.saveQuestion(self.data.product._id, self.data.question, function (error, data) {
                if (data) {
                    let product = data.product;
                    self.data.question = {};
                    self.data.product = product;
                }
            });
        };

        self.init();
    }]);
