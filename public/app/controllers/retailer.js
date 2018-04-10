'use strict';

appControllers.controller('RetailerController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
        const self = this;

        self.request = function() {
            $rootScope.messages = {};
            $rootScope.messages.warning = 'This function is disabled.';
        }
    }]);
