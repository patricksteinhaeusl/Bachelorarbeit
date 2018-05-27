'use strict';

appControllers.controller('AlertsController', ['$rootScope', function ($rootScope) {
    const self = this;

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
    }
}]);
