'use strict';

appServices.factory('AccountService', ['$http', 'Upload', 'ResponseService', function ($http, Upload, ResponseService) {
    return {
        getAll(callback) {
            $http
                .get('/api/account')
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        get(accountId, callback) {
            $http
                .get('/api/account/' + accountId)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        update(account, callback) {
            let data = {account: account};
            $http
                .put('/api/account', data)
                .then(
                    (response) => ResponseService.successCallback(response, callback),
                    (error) => ResponseService.errorCallback(error, callback)
                );
        },
        upload(accountId, profile, callback, callbackEvent) {
            let data = {accountId: accountId, profile: profile};
            Upload.upload({
                url: '/api/account/profile',
                data: data,
            }).then(
                (response) => ResponseService.successCallback(response, callback),
                (error) => ResponseService.errorCallback(error, callback),
                (event) => ResponseService.eventCallback(event, callbackEvent)
            );
        }
    };
}]);
