'use strict';

appControllers.controller('DeliveryAddressController', ['$scope', '$location', '$routeParams', 'DeliveryAddressService', 'AuthService',
    function ($scope, $location, $routeParams, DeliveryAddressService, AuthService) {
        const self = this;
        self.data = {};
        self.data.deliveryAddress = {};

        self.init = function () {
            self.getById();
        };

        self.getById = function () {
            let deliveryAddressId = $routeParams.deliveryAddressId;
            let accountId = AuthService.getUser()._id;
            if (deliveryAddressId) {
                DeliveryAddressService.getById(deliveryAddressId, accountId, function (error, data) {
                    if(data) {
                        let deliveyAddress = data.deliveryAddress;
                        self.data.deliveryAddress = deliveyAddress;
                    }
                });
            }
        };

        self.update = function () {
            let deliveryAddress = self.data.deliveryAddress;
            DeliveryAddressService.update(deliveryAddress, self.updateDeliveryAddress);
        };

        self.insert = function () {
            let deliveryAddress = self.data.deliveryAddress;
            deliveryAddress._account = AuthService.getUser()._id;
            DeliveryAddressService.insert(deliveryAddress, self.updateDeliveryAddress);
        };

        self.updateDeliveryAddress = (error, data) => {
            if (data) {
                self.data.deliveryAddress = {};
                $location.path('/deliveryaddresses');
            }
        };

        self.init();
    }]);
