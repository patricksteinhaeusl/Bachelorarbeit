'use strict';

appControllers.controller('AccountController', ['$scope', '$rootScope', 'AccountService', 'AuthService', function ($scope, $rootScope, AccountService, AuthService) {
    const self = this;
    self.data = {};
    self.data.account = {};
    self.data.profile = {};
    self.data.progress = 0;

    self.init = function () {
        self.get(AuthService.getUser()._id);
    };

    self.get = function(accountId) {
        $rootScope.messages = {};
        AccountService.get(accountId, function (error, data, message, validations) {
            if (error) $rootScope.messages.error = error;
            if (validations) $rootScope.messages.validations = validations;
            if (!data) $rootScope.messages.warning = message;
            if (data) {
                self.data.account = data.user;
                $rootScope.messages.success = message;
            }
        });
    };

    self.update = function () {
        let account = self.data.account;
        $rootScope.messages = {};
        AccountService.update(account, function (error, data, message, validations) {
            if (error) $rootScope.messages.error = error;
            if (validations) $rootScope.messages.validations = validations;
            if (!data) $rootScope.messages.warning = message;
            if (data) {
                self.data.account = data.user;
                $rootScope.messages.success = message;
            }
        });
    };

    self.upload = function () {
        let accountId = AuthService.getUser()._id;
        $rootScope.messages = {};
        AccountService.upload(accountId, self.data.profile, function (error, data, message, validations) {
            if (error) $rootScope.messages.error = error;
            if (validations) $rootScope.messages.validations = validations;
            if (!data) $rootScope.messages.warning = message;
            if (data) {
                self.data.account = data.user;
                $rootScope.messages.success = message;
            }
        }, function (progress) {
            self.data.progress = progress;
        });
    };

    self.init();
}]);
