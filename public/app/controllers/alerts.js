'use strict';

appControllers.controller('AlertsController', ['$rootScope', function ($rootScope) {
    const self = this;

    this.clear = function() {
        $rootScope.messages = {};
    }
}]);
