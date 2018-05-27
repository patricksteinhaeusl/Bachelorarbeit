'use strict';

appControllers.controller('RetailerController', ['$rootScope', function ($rootScope) {
    const self = this;

    self.request = () => {
        $rootScope.messages.warnings.push({msg: 'This function is disabled.'});
    }
}]);
