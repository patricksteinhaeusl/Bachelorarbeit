'use strict';

appControllers.controller('AlertsController', ['AlertsService', function (AlertsService) {
    var self = this;

    self.clearSuccess = function (index) {
        AlertsService.clearSuccess(index);
    };
    self.clearWarning = function (index) {
        AlertsService.clearWarning(index);
    };
    self.clearValidation = function (index) {
        AlertsService.clearValidation(index);
    };
    self.clearError = function (index) {
        AlertsService.clearError(index);
    };
}]);