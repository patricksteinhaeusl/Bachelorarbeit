'use strict';

appControllers.controller('AlertsController', ['AlertsService', function (AlertsService) {
    const self = this;

    self.clearSuccess = (index) => {
        AlertsService.clearSuccess(index);
    };
    self.clearWarning = (index) => {
        AlertsService.clearWarning(index);
    };
    self.clearValidation = (index) => {
        AlertsService.clearValidation(index);
    };
    self.clearError = (index) => {
        AlertsService.clearError(index);
    }
}]);
