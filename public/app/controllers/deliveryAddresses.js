'use strict';

appControllers.controller('DeliveryAddressesController', ['$rootScope', '$scope', '$location', 'DeliveryAddressesService', 'AuthService',
    function ($rootScope, $scope, $location, deliveryAddressesService, authService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.deliveryAddresses = {};

        self.init = function () {
            self.data.account = authService.getUser();
            self.getAllByAccount();
        };

        self.getAllByAccount = function () {
            let account = self.data.account;
            deliveryAddressesService.getAllByAccount(account, function (data) {
                self.data.deliveryAddresses = data;
            });
        };

        self.remove = function (index) {
            let deliveryAddressId = self.data.deliveryAddresses[index]._id;
            $rootScope.messages = {};
            deliveryAddressesService.remove(deliveryAddressId, function (error, data, message) {
                if (error) $rootScope.messages.error = error;
                $rootScope.messages.success = message;
                self.data.deliveryAddresses.splice(index, 1);
            });
        };

        self.goToDeliverAddressAdd = function () {
            $location.path('/deliveryaddress');
        };

        self.init();
}]);
