'use strict';

appServices.factory('AuthService', ['$http', '$rootScope', 'localStorageService', 'ResponseService', 'AlertsService',
    function  ($http, $rootScope, LocalStorageService, ResponseService, AlertsService) {
        return {
            login(user, callback) {
                $http
                    .post('/api/auth/login', user)
                    .then(
                        (response) => ResponseService.successCallback(response, callback),
                        (error) => ResponseService.errorCallback(error, callback)
                    );
            },
            register(account, callback) {
                $http
                    .post('/api/auth/register', account)
                    .then(
                        (response) => ResponseService.successCallback(response, callback),
                        (error) => ResponseService.errorCallback(error, callback)
                    );
            },
            logout(callback) {
                let user = LocalStorageService.get('user');
                LocalStorageService.remove('token');
                LocalStorageService.remove('user');
                $http.defaults.headers.common.Authorization = '';
                AlertsService.addSuccess('Logout was successfully');
                return callback(null, {user: user});
            },
            isAuthenticated() {
                return (LocalStorageService.get('token') && LocalStorageService.get('user') !== null)
            },
            getUser() {
                if (LocalStorageService.get('token')) {
                    return LocalStorageService.get('user');
                }
                return null;
            }
        };
}]);
