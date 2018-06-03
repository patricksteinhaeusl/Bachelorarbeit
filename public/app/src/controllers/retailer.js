'use strict';

appControllers.controller('RetailerController', ['$rootScope', 'AlertsService', function ($rootScope, AlertsService) {
    const self = this;

    self.request = () => {
        AlertsService.addWarning('This function is disabled.');
    }
}]);
