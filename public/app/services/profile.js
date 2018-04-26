'use strict';

appServices.factory('ProfileService', ['$http', '$q', function ($http, $q) {
    return {
        getByAccountId: function (accountId, callback) {
            $http
                .get('/api/account/' + accountId + '/profile')
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let data = response.data.data;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        let profile = data.profile;
                        let responseData = {profile: profile};
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
