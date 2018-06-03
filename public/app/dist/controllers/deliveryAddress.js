'use strict';

appControllers.controller('DeliveryAddressController', ['$scope', '$location', '$routeParams', 'DeliveryAddressService', 'AuthService', function ($scope, $location, $routeParams, DeliveryAddressService, AuthService) {
    var self = this;
    self.data = {};
    self.data.deliveryAddress = {};

    self.init = function () {
        self.getById();
    };

    self.getById = function () {
        var deliveryAddressId = $routeParams.deliveryAddressId;
        var accountId = AuthService.getUser()._id;
        if (deliveryAddressId) {
            DeliveryAddressService.getById(deliveryAddressId, accountId, function (error, data) {
                if (data) {
                    var deliveryAddress = data.deliveryAddress;
                    self.data.deliveryAddress = deliveryAddress;
                }
            });
        }
    };

    self.update = function () {
        var deliveryAddress = self.data.deliveryAddress;
        DeliveryAddressService.update(deliveryAddress, self.updateDeliveryAddress);
    };

    self.insert = function () {
        var deliveryAddress = self.data.deliveryAddress;
        deliveryAddress._account = AuthService.getUser()._id;
        DeliveryAddressService.insert(deliveryAddress, self.updateDeliveryAddress);
    };

    self.updateDeliveryAddress = function (error, data) {
        if (data) {
            self.data.deliveryAddress = {};
            $location.path('/deliveryaddresses');
        }
    };

    self.init();
}]);