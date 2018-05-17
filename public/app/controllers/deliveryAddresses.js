'use strict';

appControllers.controller('DeliveryAddressesController', ['$scope', '$location', 'DeliveryAddressesService', 'AuthService',
    function ($scope, $location, DeliveryAddressesService, AuthService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.deliveryAddresses = {};

        self.init = function () {
            self.data.account = AuthService.getUser();
            self.getAllByAccount();
        };

        self.getAllByAccount = function () {
            let account = self.data.account;
            DeliveryAddressesService.getAllByAccount(account, function (error, data) {
                if(data) {
                    let deliveryAddresses = data.deliveryAddresses
                    self.data.deliveryAddresses = deliveryAddresses;
                }
            });
        };

        self.remove = function (index) {
            let deliveryAddressId = self.data.deliveryAddresses[index]._id;
            DeliveryAddressesService.remove(deliveryAddressId, function (error, data) {
                if(data) {
                    self.data.deliveryAddresses.splice(index, 1);
                }
            });
        };

        self.goToDeliverAddressAdd = function () {
            $location.path('/deliveryaddress');
        };

        self.init();
}]);
