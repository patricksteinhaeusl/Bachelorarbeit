'use strict';

appControllers.controller('CreditCardController', ['$scope', '$location', '$routeParams', 'CreditCardService', 'AuthService', function ($scope, $location, $routeParams, CreditCardService, AuthService) {
    var self = this;
    self.data = {};
    self.data.creditCard = {};

    self.years = [];
    self.months = [{ "value": 1, "text": "January" }, { "value": 2, "text": "February" }, { "value": 3, "text": "March" }, { "value": 4, "text": "April" }, { "value": 5, "text": "May" }, { "value": 6, "text": "June" }, { "value": 7, "text": "July" }, { "value": 8, "text": "August" }, { "value": 9, "text": "September" }, { "value": 10, "text": "October" }, { "value": 11, "text": "November" }, { "value": 12, "text": "December" }];

    self.generateYears = function () {
        var minYear = new Date().getFullYear();
        for (var i = 0; i <= 3; i++) {
            self.years.push(minYear + i);
        }
        return self.years;
    };

    self.init = function () {
        self.getByNumber();
        self.generateYears();
    };

    self.getByNumber = function () {
        var creditCardNumber = $routeParams.creditCardNumber;
        if (creditCardNumber) {
            CreditCardService.getByNumber(creditCardNumber, function (error, data) {
                if (data) {
                    var creditCard = data.creditCard;
                    self.data.creditCard = creditCard;
                }
            });
        }
    };

    self.update = function () {
        var creditCard = self.data.creditCard;
        CreditCardService.update(creditCard, self.updateCreditCard);
    };

    self.insert = function () {
        var creditCard = self.data.creditCard;
        creditCard._account = AuthService.getUser()._id;
        CreditCardService.insert(creditCard, self.updateCreditCard);
    };

    self.updateCreditCard = function (error, data) {
        if (data) {
            self.data.creditCard = {};
            $location.path('/creditcards');
        }
    };

    self.init();
}]);