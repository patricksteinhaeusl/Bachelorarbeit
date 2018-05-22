'use strict';

appControllers.controller('AlertsController', ['$rootScope', function ($rootScope) {
    const self = this;

    self.clear = () => {
        $rootScope.messages = {};

        $rootScope.messages.successes = [];
        $rootScope.messages.warnings = [];
        $rootScope.messages.validations = [];
        $rootScope.messages.errors = [];
    }
}]);
