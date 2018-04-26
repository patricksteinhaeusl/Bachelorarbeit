'use strict';

appServices.factory('AccountService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    return {
        get: function (accountId, callback) {
            $http
                .get('/api/account/' + accountId)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let user = data.user;
                        let responseData = {user: user};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
        update: function (account, callback) {
            let data = {account: account};
            $http
                .put('/api/account', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let user = data.user;
                        let token = data.token;
                        localStorageService.set('user', user);
                        localStorageService.set('token', token);
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                        let responseData = {user: user, token: token};
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        },
        insertOrUpdateProfile: function (accountId, profile, callback) {
            let data = { accountId: accountId, profile: profile };
            $http
                .post('/api/account/profile', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let user = data.user;
                        let token = data.token;
                        let profile = data.user.profile;
                        let responseData = {profile: profile};
                        localStorageService.set('user', user);
                        localStorageService.set('token', token);
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                        return callback(null, responseData, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        }
    };
}]);
