'use strict';

appControllers.controller('ProductController', ['$rootScope', '$scope', '$routeParams', 'AuthService', 'ProductService',
    function ($rootScope, $scope, $routeParams, AuthService, ProductService) {
        const self = this;

        self.data = {};
        self.data.product = {};
        self.data.question = {};

        self.init = function () {
            self.get($routeParams.productId);
        };

        self.get = function (productId) {
            $rootScope.messages = {};
            ProductService.get(productId, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.product = data;
                    $rootScope.messages.success = message;
                }
            });
        };

        self.saveQuestion = function () {
            $rootScope.messages = {};
            self.data.question._account = AuthService.getUser()._id;
            ProductService.saveQuestion(self.data.product._id, self.data.question, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.question = {};
                    self.data.product = data;
                    $rootScope.messages.success = message;
                }
            });
        };

        self.init();
    }]);
