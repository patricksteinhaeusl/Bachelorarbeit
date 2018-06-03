'use strict';

appServices.factory('ResponseService', [function () {
    return {
        successCallback(successResponse, callback) {
            let data = successResponse.data.data;
            return callback(null, data);
        },
        errorCallback(errorResponse, callback) {
            let message = errorResponse.data.message;
            return callback(message, null);
        },
        eventCallback(eventResponse, callback) {
            let progressPercentage = parseInt(100 * event.loaded / event.total);
            return callback(progressPercentage);
        }
    };
}]);
