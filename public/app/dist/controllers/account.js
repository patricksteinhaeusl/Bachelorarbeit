'use strict';

appControllers.controller('AccountController', ['$scope', '$interval', '$http', '$location', 'localStorageService', 'AccountService', 'AuthService', 'clipboard', function ($scope, $interval, $http, $location, localStorageService, AccountService, AuthService, clipboard) {
    var self = this;
    var baseURL = void 0;
    self.data = {};
    self.data.account = {};
    self.data.profile = {};
    self.data.progress = 0;
    self.showMsg = false;

    self.copySuccess = function () {
        self.showMsg = true;
        self.copyMessage = "Success";
        $interval(function () {
            self.showMsg = false;
        }, 2000, 1);
    };

    self.copyFail = function (err) {
        self.showMsg = true;
        self.copyMessage = "Failed";
        $interval(function () {
            self.showMsg = false;
        }, 2000, 1);
    };

    self.init = function () {
        self.get(AuthService.getUser()._id);

        if ($location.port() !== 443 && $location.port() !== 80) {
            baseURL = $location.protocol() + "://" + $location.host() + ":" + $location.port();
        } else {
            baseURL = $location.protocol() + "://" + $location.host();
        }
        self.textToCopy = baseURL + "/#!/profiles/" + AuthService.getUser()._id;

        if (!clipboard.supported) {
            self.showMsg = true;
            self.copyMessage = "Browser not supported. Copy by hand.";
        }
    };

    self.get = function (accountId) {
        AccountService.get(accountId, self.updateUserData);
    };

    self.update = function () {
        var account = self.data.account;
        AccountService.update(account, function (error, data) {
            if (data) {
                var user = data.user;
                var token = data.token;

                localStorageService.set('user', user);
                localStorageService.set('token', token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                self.data.account = user;
            }
        });
    };

    self.upload = function () {
        var accountId = AuthService.getUser()._id;
        AccountService.upload(accountId, self.data.profile, self.updateUserData, function (progress) {
            self.data.progress = progress;
        });
    };

    self.updateUserData = function (error, data) {
        if (data) {
            var user = data.user;
            self.data.account = user;
        }
    };

    self.init();
}]);