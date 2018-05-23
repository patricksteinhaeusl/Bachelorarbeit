'use strict';

appControllers.controller('DeliveryAddressesController', ['$scope', '$location', 'DeliveryAddressesService', 'AuthService',
    function ($scope, $location, DeliveryAddressesService, AuthService) {
        const self = this;
        self.data = {};
        self.data.account = {};
        self.data.deliveryAddresses = {};

        self.init = () => {
            self.data.account = AuthService.getUser();
            self.getAllByAccount();
        };

        self.getAllByAccount = () => {
            let account = self.data.account;
            DeliveryAddressesService.getAllByAccount(account, (error, data) => {
                if(data) {
                    let deliveryAddresses = data.deliveryAddresses;
                    self.data.deliveryAddresses = deliveryAddresses;
                }
            });
        };

        self.remove = (index) => {
            let deliveryAddressId = self.data.deliveryAddresses[index]._id;
            DeliveryAddressesService.remove(deliveryAddressId, (error, data) => {
                if (!error) {
                    self.data.deliveryAddresses.splice(index, 1);
                }
            });
        };

        self.goToDeliverAddressAdd = () => {
            $location.path('/deliveryaddress');
        };

        self.init();
    }]);
