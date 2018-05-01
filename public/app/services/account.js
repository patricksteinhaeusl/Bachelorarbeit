'use strict';

appServices.factory('AccountService', ['$http', '$q', 'Upload', 'localStorageService', function ($http, $q, Upload, localStorageService) {
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
        upload: function (accountId, profile, callback, callbackEvent) {
            let data = {accountId: accountId, profile: profile};
            Upload.upload({
                url: '/api/account/profile',
                data: data,
            }).then(function (response) {
                let statusCode = response.data.statusCode;
                let data = response.data.data;
                let message = response.data.message;
                let validations = response.data.validations;
                if (statusCode === 200) {
                    let responseData = data;
                    return callback(null, responseData, message, null);
                } else if (statusCode === 405) {
                    return callback(null, null, null, validations);
                }
                return callback(null, null, message, null);
            }, function (error) {
                return callback(error);
            }, function (event) {
                let progressPercentage = parseInt(100 * event.loaded / event.total);
                return callbackEvent(progressPercentage);
            });
        },
    };
}]);
