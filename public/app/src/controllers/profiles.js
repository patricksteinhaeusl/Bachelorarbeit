'use strict';

appControllers.controller('ProfilesController', ['$scope', 'AccountService', function ($scope, AccountService) {
    const self = this;
    self.data = {};
    self.accounts = {};

    self.init = () => {
        self.getAll();
    };

    self.getAll = () => {
        AccountService.getAll((error, data) => {
            if(data) {
                self.accounts = data.accounts;
            }
        });
    };

    self.init();
}]);
