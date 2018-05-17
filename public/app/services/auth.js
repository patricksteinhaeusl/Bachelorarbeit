'use strict';

appServices.factory('AuthService', ['$http', 'localStorageService', 'ResponseService', function ($http, localStorageService, ResponseService) {
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
            let user = localStorageService.get('user');
            localStorageService.remove('token');
            localStorageService.remove('user');
            $http.defaults.headers.common.Authorization = '';
            return callback(null, user, 'Logout successfully');
        },
        isAuthenticated: function () {
            return !!(localStorageService.get('token') && localStorageService.get('user') !== null);
        },
        getUser: function () {
            if (localStorageService.get('token')) {
                return localStorageService.get('user');
            }
            return null;
        }
    };
}]);
