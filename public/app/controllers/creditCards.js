'use strict';

appControllers.controller('CreditCardsController', ['$scope', '$location', 'CreditCardsService', 'AuthService',
    function ($scope, $location, CreditCardsService, AuthService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.creditCards = {};

        self.init = () => {
            self.data.account = AuthService.getUser();
            self.getAllByAccount();
        };

        self.getAllByAccount = () => {
            let account = self.data.account;
            CreditCardsService.getAllByAccount(account, (error, data) => {
                if(data) {
                    let creditCards = data.creditCards;
                    self.data.creditCards = creditCards;
                }
            });
        };

        self.remove = (index) => {
            let creditCardId = self.data.creditCards[index]._id;
            CreditCardsService.remove(creditCardId, (error, data) => {
                if (!error) {
                    self.data.creditCards.splice(index, 1);
                }
            });
        };

        self.goToCreditCardAdd = () => {
            $location.path('/creditcard');
        };

        self.init();
}]);
