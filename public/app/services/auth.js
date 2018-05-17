'use strict';

appServices.factory('AuthService', ['$http', '$rootScope', 'localStorageService', 'ResponseService', function ($http, $rootScope, LocalStorageService, ResponseService) {
    return {
        login: function (user, callback) {
            $http
                .post('/api/auth/login', user)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        register: function (account, callback) {
            $http
                .post('/api/auth/register', account)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        logout: function (callback) {
            let user = LocalStorageService.get('user');
            LocalStorageService.remove('token');
            LocalStorageService.remove('user');
            $http.defaults.headers.common.Authorization = '';
            $rootScope.messages.successes.push('Logout was successfully');
            return callback(null, {user: user});
        },
        isAuthenticated: function () {
            return !!(LocalStorageService.get('token') && LocalStorageService.get('user') !== null);
        },
        getUser: function () {
            if (LocalStorageService.get('token')) {
                return LocalStorageService.get('user');
            }
            return null;
        }
    };
}]);
