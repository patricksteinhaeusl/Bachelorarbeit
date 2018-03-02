'use strict';

appControllers.controller('AccountController', ['$scope', '$timeout', 'AccountService', 'AuthService', function ($scope, $timeout, accountService, authService) {
    const self = this;
    self.data = {};
    self.data.account = {};

    self.init = function () {
        self.data.account = authService.getUser();
    };

    self.update = function () {
        let account = self.data.account;
        self.update.messages = {};
        accountService.update(account, function (error, data, message, validations) {
            if (error) self.update.messages.error = error;
            if (validations) self.update.validations = validations;
            if (!data) self.update.messages.warning = message;
            if (data) {
                self.data.account = data.user;
                self.update.messages.success = message;
            }

            $timeout(function () {
                self.update.messages = {};
                self.update.validations = {};
            }, 5000);
        });
    };

    self.init();
}]);
