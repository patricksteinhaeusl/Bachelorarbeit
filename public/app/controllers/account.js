'use strict';

appControllers.controller('AccountController', ['$scope', 'AccountService', 'AuthService', function ($scope, accountService, AuthService) {
    const self = this;
    self.data = {};
    self.data.account = {};

    self.init = function () {
        self.get(AuthService.getUser()._id);
    };

    self.get = function(accountId) {
        self.get.messages = {};
        self.data.account = accountService.get(accountId, function (error, data, message, validations) {
            if (error) self.get.messages.error = error;
            if (validations) self.get.validations = validations;
            if (!data) self.get.messages.warning = message;
            if (data) {
                self.data.account = data.user;
                self.get.messages.success = message;
            }
        });
    };

    self.update = function () {
        let account = self.data.account;
        self.update.messages = {};
        AuthService.update(account, function (error, data, message, validations) {
            if (error) self.update.messages.error = error;
            if (validations) self.update.validations = validations;
            if (!data) self.update.messages.warning = message;
            if (data) {
                self.data.account = data.user;
                self.update.messages.success = message;
            }
        });
    };

    self.init();
}]);
