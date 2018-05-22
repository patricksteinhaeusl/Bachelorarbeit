'use strict';

appServices.factory('ResponseService', [function () {
    return {
        successCallback: function (successResponse, callback) {
            let data = successResponse.data.data;
            return callback(null, data);
        },
        errorCallback: function (errorResponse, callback) {
            let message = errorResponse.data.message;
            return callback(message, null);
        },
        eventCallback: function(eventResponse, callback) {
            let progressPercentage = parseInt(100 * event.loaded / event.total);
            return callback(progressPercentage);
        }
    };
}]);
