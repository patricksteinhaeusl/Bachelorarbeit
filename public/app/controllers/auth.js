'use strict';

appControllers.controller('AuthController', ['$scope', '$http', '$location', '$cookies', 'localStorageService', 'AuthService', 'WebSocketService',
    function ($scope, $http, $location, $cookies, LocalStorageService, AuthService, WebSocketService) {
        let self = this;
        self.data = {};
        self.data.login = {};
        self.data.register = {};

        self.login = function () {
            let user = self.data.login.user;
            AuthService.login(user, function (error, data) {
                if (data) {
                    let user = data.user;
                    let token = data.token;

                    LocalStorageService.set('user', user);
                    LocalStorageService.set('token', token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                    $cookies.put('chatUser', user._id);
                    WebSocketService.join(user);
                    self.data.login.user = {};
                }
            });
        };

        self.register = function () {
            let account = self.data.register.account;
            AuthService.register(account, function (error, data) {
                if (data) {
                    let user = data.user;
                    let token = data.token;

                    LocalStorageService.set('user', user);
                    LocalStorageService.set('token', token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                    $cookies.put('chatUser', data.user._id);
                    WebSocketService.join(data.user);
                    self.data.register.account = {};
                    $location.path('/shop');
                }
            });
        };

        self.logout = function () {
            AuthService.logout(function (error, data) {
                if (data) {
                    let user = data.user;

                    WebSocketService.leave(user);
                    $cookies.remove('chatUser');
                    $location.path('/home');
                }
            });
        };

        self.isAuthenticated = AuthService.isAuthenticated;

        self.getUser = AuthService.getUser;

}]);
