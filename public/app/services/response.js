'use strict';

appServices.factory('ResponseService', ['$rootScope', function ($rootScope) {
    return {
        successCallback: function (successResponse, callback) {
            let statusCode = successResponse.data.statusCode;
            let data = successResponse.data.data;
            let message = successResponse.data.message;
            let validations = successResponse.data.validations;

            console.log("STATUSCODE", statusCode);
            console.log("DATA", data);
            console.log("VALIDATIONS", validations);
            console.log("MESSAGE", message);

            if (statusCode === 200) {
                $rootScope.messages.successes.push(message);
                return callback(null, data);
            } else if (statusCode === 404) {
                $rootScope.messages.warnings.push(message);
                return callback(message, null);
            } else if (statusCode === 405) {
                $rootScope.messages.validations.push(validations);
                return callback(message, null);
            } else if (statusCode === 500) {
                $rootScope.messages.errors.push(message);
                return callback(message, null);
            }
        },
        errorCallback: function (errorResponse, callback) {
            let message = errorResponse.statusText;
            $rootScope.messages.errors.push(message);
            return callback(errorResponse, null);
        },
        eventCallback: function(eventResponse, callback) {
            let progressPercentage = parseInt(100 * event.loaded / event.total);
            return callback(progressPercentage);
        }
    };
}]);
