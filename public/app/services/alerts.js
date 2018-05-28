'use strict';

appServices.factory('AlertsService', ['$rootScope', '$interval', function  ($rootScope, $interval) {

    const self = this;

    self.addSuccess = (message) => {
        let alertIdentifier = uniqueNumber();
        $rootScope.messages.successes.push({msg: message, id: alertIdentifier});
        deleteAlert("successes", alertIdentifier);
    };
    self.addWarning = (message) => {
        let alertIdentifier = uniqueNumber();
        $rootScope.messages.warnings.push({msg: message, id: alertIdentifier});
        deleteAlert("warnings", alertIdentifier);
    };
    self.addValidation = (validations) => {
        let alertIdentifier = uniqueNumber();
        $rootScope.messages.validations.push({msg: validations, id: alertIdentifier});
        deleteAlert("validations", alertIdentifier);
    };
    self.addError = (message) => {
        let alertIdentifier = uniqueNumber();
        $rootScope.messages.errors.push({msg: message, id: alertIdentifier});
        deleteAlert("errors", alertIdentifier);
    };

    self.clearSuccess = (index) => {
        $rootScope.messages.successes.splice(index, 1);
    };

    self.clearWarning = (index) => {
        $rootScope.messages.warnings.splice(index, 1);
    };

    self.clearValidation = (index) => {
        $rootScope.messages.validations.splice(index, 1);
    };

    self.clearError = (index) => {
        $rootScope.messages.errors.splice(index, 1);
    };

    function deleteAlert(messageType, alertIdentifier) {
        $interval(()=>{
            for (let index = 0; index < $rootScope.messages[messageType].length; index++){
                if ($rootScope.messages[messageType][index].id === alertIdentifier) {
                    $rootScope.messages[messageType].splice(index,1);
                }
            }
        },4000, 1);
    }

    function uniqueNumber() {
        let date = Date.now();

        if (date <= uniqueNumber.previous) {
            ++uniqueNumber.previous;
            date = uniqueNumber.previous;
        } else {
            uniqueNumber.previous = date;
        }

        return date;
    }

    uniqueNumber.previous = 0;

    return self;
}]);
