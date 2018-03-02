'use strict';

appControllers.controller('CreditCardsController', ['$scope', '$location', 'CreditCardsService', 'AuthService', function ($scope, $location, creditCardsService, authService) {
    const self = this;
    self.data = {};
    self.data.account = {};
    self.data.creditCards = {};

    self.init = function () {
        self.data.account = authService.getUser();
        self.getAllByAccount();
    };

    self.getAllByAccount = function () {
        let account = self.data.account;
        creditCardsService.getAllByAccount(account, function (creditcards) {
            self.data.creditCards = creditcards;
        });
    };

    self.remove = function (index) {
        let creditCardId = self.data.creditCards[index]._id;
        creditCardsService.remove(creditCardId, function () {
            self.data.creditCards.splice(index, 1);
        });
    };

    self.goToCreditCardAdd = function () {
        $location.path('/creditcard');
    };

    self.init();
}]);
