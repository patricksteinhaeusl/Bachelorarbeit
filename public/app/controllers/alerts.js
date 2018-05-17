'use strict';

appControllers.controller('AlertsController', ['$rootScope', function ($rootScope) {
    const self = this;

    self.clear = function() {
        $rootScope.messages = {};
    }
}]);
