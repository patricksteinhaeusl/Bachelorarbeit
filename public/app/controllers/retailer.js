'use strict';

appControllers.controller('RetailerController', ['$rootScope', function ($rootScope) {
    const self = this;

    self.request = function() {
        $rootScope.messages.warnings.push('This function is disabled.');
    }
}]);
