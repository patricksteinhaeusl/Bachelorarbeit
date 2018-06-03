'use strict';

appServices.factory('ResponseService', [function () {
    return {
        successCallback: function successCallback(successResponse, callback) {
            var data = successResponse.data.data;
            return callback(null, data);
        },
        errorCallback: function errorCallback(errorResponse, callback) {
            var message = errorResponse.data.message;
            return callback(message, null);
        },
        eventCallback: function eventCallback(eventResponse, callback) {
            var progressPercentage = parseInt(100 * event.loaded / event.total);
            return callback(progressPercentage);
        }
    };
}]);