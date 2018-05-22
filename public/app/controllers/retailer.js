'use strict';

appControllers.controller('RetailerController', ['$rootScope', function ($rootScope) {
    const self = this;

    self.request = () => {
        $rootScope.messages.warnings.push('This function is disabled.');
    }
}]);
