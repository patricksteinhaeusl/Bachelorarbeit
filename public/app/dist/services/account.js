'use strict';

appServices.factory('AccountService', ['$http', 'Upload', 'ResponseService', function ($http, Upload, ResponseService) {
    return {
        getAll: function getAll(callback) {
            $http.get('/api/account').then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        get: function get(accountId, callback) {
            $http.get('/api/account/' + accountId).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        update: function update(account, callback) {
            var data = { account: account };
            $http.put('/api/account', data).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            });
        },
        upload: function upload(accountId, profile, callback, callbackEvent) {
            var data = { accountId: accountId, profile: profile };
            Upload.upload({
                url: '/api/account/profile',
                data: data
            }).then(function (response) {
                return ResponseService.successCallback(response, callback);
            }, function (error) {
                return ResponseService.errorCallback(error, callback);
            }, function (event) {
                return ResponseService.eventCallback(event, callbackEvent);
            });
        }
    };
}]);