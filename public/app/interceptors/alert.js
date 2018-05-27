appInterceptors.factory('AlertInterceptor', ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {
    return {
        response: (successResponse) => {
            let statusCode = successResponse.data.statusCode;
            let message = successResponse.data.message;

            if (statusCode === 200) {
                if (message) {
                    let alertIdentifier = uniqueNumber();
                    $rootScope.messages.successes.push({msg: message, id: alertIdentifier});
                    deleteAlert("successes", alertIdentifier);
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
                    let alertIdentifier = uniqueNumber();
                    $rootScope.messages.warnings.push({msg: message, id: alertIdentifier});
                    deleteAlert("warnings", alertIdentifier);
                }
            } else if (statusCode === 405) {
                if (validations) {
                    let alertIdentifier = uniqueNumber();
                    $rootScope.messages.validations.push({msg: validations, id: alertIdentifier});
                    deleteAlert("validations", alertIdentifier);
                }
            } else if (statusCode === 500) {
                if (message) {
                    let alertIdentifier = uniqueNumber();
                    $rootScope.messages.errors.push({msg: message, id: alertIdentifier});
                    deleteAlert("errors", alertIdentifier);
                }
            }

            return $q.reject(errorResponse);
        }
    };

    function deleteAlert(messageType, alertIdentifier) {
        $timeout(()=>{
            for (let index = 0; index < $rootScope.messages[messageType].length; index++){
                if ($rootScope.messages[messageType][index].id === alertIdentifier) {
                    $rootScope.messages[messageType].splice(index,1);
                }
            }
        },4000);
    }
}]);

function uniqueNumber() {
    let date = Date.now();

    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

uniqueNumber.previous = 0;
