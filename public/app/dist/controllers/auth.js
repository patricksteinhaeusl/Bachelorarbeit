'use strict';

appControllers.controller('AuthController', ['$window', '$scope', '$http', '$location', '$route', '$cookies', 'localStorageService', 'AuthService', 'WebSocketService', function ($window, $scope, $http, $location, $route, $cookies, LocalStorageService, AuthService, WebSocketService) {
    var self = this;
    self.data = {};
    self.data.login = {};
    self.data.register = {};

    self.login = function () {
        var user = self.data.login.user;
        AuthService.login(user, function (error, data) {
            if (data) {
                var _user = data.user;
                var token = data.token;

                $cookies.put('chatUser', _user._id);

                LocalStorageService.set('user', _user);
                LocalStorageService.set('token', token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                WebSocketService.connect();
                WebSocketService.join(_user);
                self.data.login.user = {};
                $window.location.href = '#!/shop?selectedQuantity=1';
            }
        });
    };

    self.register = function () {
        var account = self.data.register.account;
        AuthService.register(account, function (error, data) {
            if (data) {
                var user = data.user;
                var token = data.token;

                LocalStorageService.set('user', user);
                LocalStorageService.set('token', token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                $cookies.put('chatUser', user._id);
                WebSocketService.join(user);
                self.data.register.account = {};
                $window.location.href = '#!/shop?selectedQuantity=1';
            }
        });
    };

    self.logout = function () {
        AuthService.logout(function (error, data) {
            if (data) {
                var user = data.user;

                WebSocketService.leave(user);
                $cookies.remove('chatUser');
                $location.path('/home');
            }
        });
    };

    self.isAuthenticated = AuthService.isAuthenticated;

    self.getUser = AuthService.getUser;
}]);