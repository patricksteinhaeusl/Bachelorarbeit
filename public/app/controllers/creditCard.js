'use strict';

appControllers.controller('CreditCardController', ['$rootScope', '$scope', '$location', '$timeout', '$routeParams', 'CreditCardService', 'AuthService',
    function ($rootScope, $scope, $location, $timeout, $routeParams, creditCardService, authService) {
        const self = this;
        self.data = {};
        self.data.creditCard = {};

        self.init = function () {
            self.getByNumber();
        };

        self.getByNumber = function () {
            let creditCardNumber = $routeParams.creditCardNumber;
            if (creditCardNumber) {
                creditCardService.getByNumber(creditCardNumber, function (data) {
                    self.data.creditCard = data;
                });
            }
        };

        self.update = function () {
            let creditCard = self.data.creditCard;
            $rootScope.messages = {};
            creditCardService.update(creditCard, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.creditCard = {};
                    $rootScope.messages.success = message;
                    $location.path('/creditcards');
                }

                $timeout(function () {
                    $rootScope.messages = {};
                }, 5000);
            });
        };

        self.insert = function () {
            let creditCard = self.data.creditCard;
            creditCard._account = authService.getUser()._id;
            $rootScope.messages = {};
            creditCardService.insert(creditCard, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.creditCard = {};
                    $rootScope.messages.success = message;
                    $location.path('/creditcards');
                }

                $timeout(function () {
                    $rootScope.messages = {};
                }, 5000);
            });
        };

        self.init();
    }]);
