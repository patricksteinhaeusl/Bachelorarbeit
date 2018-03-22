'use strict';

appControllers.controller('AuthController', ['$rootScope', '$scope', '$location', '$cookies', 'AuthService', 'WebSocketService',
    function ($rootScope, $scope, $location, $cookies, authService, webSocketService) {
        let self = this;
        self.data = {};
        self.data.login = {};
        self.data.register = {};

        self.login = function () {
            let user = self.data.login.user;
            $rootScope.messages = {};
            authService.login(user, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    $cookies.put('room', data.user._id);
                    webSocketService.join(data.user);
                    $rootScope.messages.success = message;
                    self.data.login.user = {};
                }
            });
        };

        self.register = function () {
            let account = self.data.register.account;
            $rootScope.messages = {};
            authService.register(account, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    $cookies.put('room', data.user._id);
                    webSocketService.join(data.user);
                    self.data.register.account = {};
                    $rootScope.messages.success = message;
                    $location.path('/shop');
                }
            });
        };

        self.logout = function () {
            $rootScope.messages = {};
            authService.logout(function (error, data, message) {
                if (error) $rootScope.messages.error = error;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    webSocketService.leave(data);
                    $cookies.remove('room');
                    $rootScope.messages.success = message;
                    $location.path('/home');
                }
            });
        };

        self.isAuthenticated = authService.isAuthenticated;

        self.getUser = authService.getUser;

}]);
