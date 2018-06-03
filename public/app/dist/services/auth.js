'use strict';

appServices.factory('AuthService', ['$http', '$rootScope', 'localStorageService', 'ResponseService', 'AlertsService', function ($http, $rootScope, LocalStorageService, ResponseService, AlertsService) {
    return {
        login: function login(user, callback) {
            $http.post('/api/auth/login', user).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        register: function register(account, callback) {
            $http.post('/api/auth/register', account).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        logout: function logout(callback) {
            var user = LocalStorageService.get('user');
            LocalStorageService.remove('token');
            LocalStorageService.remove('user');
            $http.defaults.headers.common.Authorization = '';
            AlertsService.addSuccess('Logout was successfully');
            return callback(null, { user: user });
        },
        isAuthenticated: function isAuthenticated() {
            return !!(LocalStorageService.get('token') && LocalStorageService.get('user') !== null);
        },
        getUser: function getUser() {
            if (LocalStorageService.get('token')) {
                return LocalStorageService.get('user');
            }
            return null;
        }
    };
}]);