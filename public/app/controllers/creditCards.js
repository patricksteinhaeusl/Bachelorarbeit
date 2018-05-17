'use strict';

appControllers.controller('CreditCardsController', ['$scope', '$location', 'CreditCardsService', 'AuthService',
    function ($scope, $location, CreditCardsService, AuthService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.creditCards = {};

        self.init = function () {
            self.data.account = AuthService.getUser();
            self.getAllByAccount();
        };

        self.getAllByAccount = function () {
            let account = self.data.account;
            CreditCardsService.getAllByAccount(account, function (error, data) {
                if(data) {
                    let creditCards = data.creditCards;
                    self.data.creditCards = creditCards;
                }
            });
        };

        self.remove = function (index) {
            let creditCardId = self.data.creditCards[index]._id;
            CreditCardsService.remove(creditCardId, function (error, data) {
                if (data) {
                    self.data.creditCards.splice(index, 1);
                }
            });
        };

        self.goToCreditCardAdd = function () {
            $location.path('/creditcard');
        };

        self.init();
}]);
