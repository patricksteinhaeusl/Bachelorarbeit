appInterceptors.factory('AlertInterceptor', ['$q', '$rootScope', 'AlertsService', function ($q, $rootScope, AlertsService) {
    return {
        response: (successResponse) => {
            let statusCode = successResponse.data.statusCode;
            let message = successResponse.data.message;

            if (statusCode === 200) {
                if (message) {
                    AlertsService.addSuccess(message);
                }

            }

            return successResponse || $q.when(successResponse);
        },
        responseError: (errorResponse) => {
            let statusCode = errorResponse.data.statusCode;
            let message = errorResponse.data.message;
            let validations = errorResponse.data.validations;

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
