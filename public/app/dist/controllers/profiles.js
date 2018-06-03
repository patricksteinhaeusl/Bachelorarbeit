'use strict';

appControllers.controller('ProfilesController', ['$scope', 'AccountService', function ($scope, AccountService) {
    var self = this;
    self.data = {};
    self.accounts = {};

    self.init = function () {
        self.getAll();
    };

    self.getAll = function () {
        AccountService.getAll(function (error, data) {
            if (data) {
                self.accounts = data.accounts;
            }
        });
    };

    self.init();
}]);