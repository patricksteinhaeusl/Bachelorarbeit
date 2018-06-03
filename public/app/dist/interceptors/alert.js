'use strict';

appInterceptors.factory('AlertInterceptor', ['$q', '$rootScope', 'AlertsService', function ($q, $rootScope, AlertsService) {
    return {
        response: function response(successResponse) {
            var statusCode = successResponse.data.statusCode;
            var message = successResponse.data.message;

            if (statusCode === 200) {
                if (message) {
                    AlertsService.addSuccess(message);
                }
            }

            return successResponse || $q.when(successResponse);
        },
        responseError: function responseError(errorResponse) {
            var statusCode = errorResponse.data.statusCode;
            var message = errorResponse.data.message;
            var validations = errorResponse.data.validations;

            if (statusCode === 404) {
                if (message) {
                    AlertsService.addWarning(message);
                }
            } else if (statusCode === 405) {
                if (validations) {
                    AlertsService.addValidation(validations);
                }
            } else if (statusCode === 500) {
                if (message) {
                    AlertsService.addError(message);
                }
            }

            return $q.reject(errorResponse);
        }
    };
}]);