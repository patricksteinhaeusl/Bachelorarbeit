'use strict';

appControllers.controller('AccountController', ['$scope', '$http', 'AccountService', 'AuthService',
    function ($scope, $http, AccountService, AuthService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.profile = {};
        self.data.progress = 0;

        self.init = function () {
            self.get(AuthService.getUser()._id);
        };

        self.get = function(accountId) {
            AccountService.get(accountId, function (error, data) {
                if (data) {
                    let user = data.user;
                    self.data.account = user;
                }
            });
        };

        self.update = function () {
            let account = self.data.account;
            AuthService.update(account, function (error, data) {
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

        self.upload = function () {
            let accountId = AuthService.getUser()._id;
            AccountService.upload(accountId, self.data.profile, function (error, data) {
                if (data) {
                    let user = data.user;

                    self.data.account = user;
                }
            }, function (progress) {
                self.data.progress = progress;
            });
        };

        self.init();
    }]);
