'use strict';

appControllers.controller('ProfileController', ['$scope', '$rootScope', '$routeParams', 'ProfileService', function ($scope, $rootScope, $routeParams, ProfileService) {
    const self = this;
    self.data = {};
    self.data.profile = {};

    self.getByAccountId = function()  {
        let accountId = $routeParams.accountId;
        $rootScope.messages = {};
        ProfileService.getByAccountId(accountId, function (error, data, message, validations) {
            if (error) $rootScope.messages.error = error;
            if (validations) $rootScope.messages.validations = validations;
            if (!data) $rootScope.messages.warning = message;
            if (data) {
                self.data.profile = data.profile;
                $rootScope.messages.success = message;
            }
        });
    };

    self.getByAccountId();
}]);
