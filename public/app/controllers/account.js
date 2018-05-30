'use strict';

appControllers.controller('AccountController', ['$scope', '$interval', '$http', '$location','localStorageService', 'AccountService', 'AuthService', 'clipboard',
    function ($scope, $interval, $http, $location, localStorageService, AccountService, AuthService, clipboard) {
        const self = this;
        let baseURL;
        self.data = {};
        self.data.account = {};
        self.data.profile = {};
        self.data.progress = 0;
        self.showMsg = false;

        self.copySuccess = () => {
            self.showMsg = true;
            self.copyMessage = "Success";
            $interval(() => {self.showMsg = false;}, 2000, 1);
        };

        self.copyFail = (err) => {
            self.showMsg = true;
            self.copyMessage = "Failed";
            $interval(() => {self.showMsg = false}, 2000, 1);
        };

        self.init = () => {
            self.get(AuthService.getUser()._id);

            if ($location.port() !== 443 && $location.port() !== 80) {
                baseURL = $location.protocol() + "://" + $location.host() + ":" + $location.port();
            } else {
                baseURL = $location.protocol() + "://" + $location.host();
            }
            self.textToCopy = baseURL + "/#!/profiles/"+ AuthService.getUser()._id;

            if (!clipboard.supported) {
                self.showMsg = true;
                self.copyMessage = "Browser not supported. Copy by hand.";
            }
        };

        self.get = (accountId) => {
            AccountService.get(accountId, self.updateUserData);
        };

        self.update = () => {
            let account = self.data.account;
            AccountService.update(account, (error, data) => {
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
