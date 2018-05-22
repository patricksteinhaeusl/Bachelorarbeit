appInterceptors.factory('AlertInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    return {
        response: function (successResponse) {
            let statusCode = successResponse.data.statusCode;
            let message = successResponse.data.message;

            if (statusCode === 200) {
                $rootScope.messages.successes.push(message);
            }

            return successResponse || $q.when(successResponse);
        },
        responseError: function (errorResponse) {
            let statusCode = errorResponse.data.statusCode;
            let message = errorResponse.data.message;
            let validations = errorResponse.data.validations;

            if (statusCode === 404) {
                $rootScope.messages.warnings.push(message);
            } else if (statusCode === 405) {
                $rootScope.messages.validations.push(validations);
            } else if (statusCode === 500) {
                $rootScope.messages.errors.push(message);
            }

            return $q.reject(errorResponse);
        }
    }
}]);
