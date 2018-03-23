'use strict';

appControllers.controller('CreditCardController', ['$rootScope', '$scope', '$location', '$routeParams', 'CreditCardService', 'AuthService',
    function ($rootScope, $scope, $location, $routeParams, creditCardService, authService) {
        const self = this;
        self.data = {};
        self.data.creditCard = {};

        self.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        self.years = [];

        self.generateYears = function () {
            let minYear = new Date().getFullYear();
            for(let i = 0; i <= 3; i++) {
                self.years.push(minYear + i);
            }
            return self.years;
        };

        self.init = function () {
            self.getByNumber();
            self.generateYears();
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
            });
        };

        self.init();
    }]);
