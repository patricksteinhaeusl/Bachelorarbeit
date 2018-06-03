'use strict';

appControllers.controller('CreditCardsController', ['$scope', '$location', 'CreditCardsService', 'AuthService', function ($scope, $location, CreditCardsService, AuthService) {
    var self = this;
    self.data = {};
    self.data.account = {};
    self.data.creditCards = {};

    self.init = function () {
        self.data.account = AuthService.getUser();
        self.getAllByAccount();
    };

    self.getAllByAccount = function () {
        var account = self.data.account;
        CreditCardsService.getAllByAccount(account, function (error, data) {
            if (data) {
                var creditCards = data.creditCards;
                self.data.creditCards = creditCards;
            }
        });
    };

    self.remove = function (index) {
        var creditCardId = self.data.creditCards[index]._id;
        CreditCardsService.remove(creditCardId, function (error, data) {
            if (!error) {
                self.data.creditCards.splice(index, 1);
            }
        });
    };

    self.goToCreditCardAdd = function () {
        $location.path('/creditcard');
    };

    self.init();
}]);