'use strict';

appControllers.controller('CreditCardsController', ['$rootScope', '$scope', '$location', '$timeout', 'CreditCardsService', 'AuthService',
    function ($rootScope, $scope, $location, $timeout, creditCardsService, authService) {
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
            $rootScope.messages = {};
            creditCardsService.remove(creditCardId, function (error, data, message) {
                if (error) $rootScope.messages.error = error;
                $rootScope.messages.success = message;
                self.data.creditCards.splice(index, 1);

                $timeout(function () {
                    $rootScope.message = {};
                }, 5000);
            });
        };

        self.goToCreditCardAdd = function () {
            $location.path('/creditcard');
        };

        self.init();
}]);
