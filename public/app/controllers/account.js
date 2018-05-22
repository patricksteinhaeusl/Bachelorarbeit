'use strict';

appControllers.controller('AccountController', ['$scope', '$http', 'AccountService', 'AuthService',
    function ($scope, $http, AccountService, AuthService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.profile = {};
        self.data.progress = 0;

        self.init = () => {
            self.get(AuthService.getUser()._id);
        };

        self.get = (accountId) => {
            AccountService.get(accountId, self.updateUserData);
        };

        self.update = () => {
            let account = self.data.account;
            AuthService.update(account, (error, data) => {
                if (data) {
                    let user = data.user;
                    let token = data.token;

                    localStorageService.set('user', user);
                    localStorageService.set('token', token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    self.data.account = user;
                }
            });
        };

        self.upload = () => {
            let accountId = AuthService.getUser()._id;
            AccountService.upload(accountId, self.data.profile, self.updateUserData, (progress) => {
                self.data.progress = progress;
            });
        };

        self.updateUserData = (error, data) => {
            if (data) {
                let user = data.user;
                self.data.account = user;
            }
        };

        self.init();
    }]);
