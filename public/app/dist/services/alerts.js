'use strict';

appServices.factory('AlertsService', ['$rootScope', '$interval', function ($rootScope, $interval) {

    var self = this;

    self.addSuccess = function (message) {
        var alertIdentifier = uniqueNumber();
        $rootScope.messages.successes.push({ msg: message, id: alertIdentifier });
        deleteAlert("successes", alertIdentifier);
    };
    self.addWarning = function (message) {
        var alertIdentifier = uniqueNumber();
        $rootScope.messages.warnings.push({ msg: message, id: alertIdentifier });
        deleteAlert("warnings", alertIdentifier);
    };
    self.addValidation = function (validations) {
        var alertIdentifier = uniqueNumber();
        $rootScope.messages.validations.push({ msg: validations, id: alertIdentifier });
        deleteAlert("validations", alertIdentifier);
    };
    self.addError = function (message) {
        var alertIdentifier = uniqueNumber();
        $rootScope.messages.errors.push({ msg: message, id: alertIdentifier });
        deleteAlert("errors", alertIdentifier);
    };

    self.clearSuccess = function (index) {
        $rootScope.messages.successes.splice(index, 1);
    };

    self.clearWarning = function (index) {
        $rootScope.messages.warnings.splice(index, 1);
    };

    self.clearValidation = function (index) {
        $rootScope.messages.validations.splice(index, 1);
    };

    self.clearError = function (index) {
        $rootScope.messages.errors.splice(index, 1);
    };

    function deleteAlert(messageType, alertIdentifier) {
        $interval(function () {
            for (var index = 0; index < $rootScope.messages[messageType].length; index++) {
                if ($rootScope.messages[messageType][index].id === alertIdentifier) {
                    $rootScope.messages[messageType].splice(index, 1);
                }
            }
        }, 4000, 1);
    }

    function uniqueNumber() {
        var date = Date.now();

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