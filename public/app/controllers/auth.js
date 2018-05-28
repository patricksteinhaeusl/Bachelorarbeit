'use strict';

appControllers.controller('AuthController', ['$scope', '$http', '$location', '$route', '$cookies', 'localStorageService', 'AuthService', 'WebSocketService',
    function ($scope, $http, $location, $route, $cookies, LocalStorageService, AuthService, WebSocketService) {
        let self = this;
        self.data = {};
        self.data.login = {};
        self.data.register = {};

        self.login = () => {
            let user = self.data.login.user;
            AuthService.login(user, (error, data) => {
                if (data) {
                    let user = data.user;
                    let token = data.token;

                    $cookies.put('chatUser', user._id);

                    LocalStorageService.set('user', user);
                    LocalStorageService.set('token', token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                    WebSocketService.connect();
                    WebSocketService.join(user);
                    self.data.login.user = {};
                    $route.reload();
                    $location.path('/shop');
                }
            });
        };

        self.register = () => {
            let account = self.data.register.account;
            AuthService.register(account, (error, data) => {
                if (data) {
                    let user = data.user;
                    let token = data.token;

                    LocalStorageService.set('user', user);
                    LocalStorageService.set('token', token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                    $cookies.put('chatUser', user._id);
                    WebSocketService.join(user);
                    self.data.register.account = {};
                    $location.path('/shop');
                }
            });
        };

        self.logout = () => {
            AuthService.logout((error, data) => {
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
