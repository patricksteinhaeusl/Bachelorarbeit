'use strict';

appControllers.controller('RetailerController', ['$rootScope', 'AlertsService', function ($rootScope, AlertsService) {
    var self = this;

    self.request = function () {
        AlertsService.addWarning('This function is disabled.');
    };
}]);