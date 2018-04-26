'use strict';

appControllers.controller('DeliveryAddressController', ['$rootScope', '$scope', '$location', '$routeParams', 'DeliveryAddressService', 'AuthService',
    function ($rootScope, $scope, $location, $routeParams, deliveryAddressService, authService) {
        const self = this;
        self.data = {};
        self.data.deliveryAddress = {};

        self.init = function () {
            self.getById();
        };

        self.getById = function () {
            let deliveryAddressId = $routeParams.deliveryAddressId;
            let accountId = authService.getUser()._id;
            if (deliveryAddressId) {
                deliveryAddressService.getById(deliveryAddressId, accountId, function (data) {
                    self.data.deliveryAddress = data;
                });
            }
        };

        self.update = function () {
            let deliveryAddress = self.data.deliveryAddress;
            $rootScope.messages = {};
            deliveryAddressService.update(deliveryAddress, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.creditCard = {};
                    $rootScope.messages.success = message;
                    $location.path('/deliveryaddresses');
                }
            });
        };

        self.insert = function () {
            let deliveryAddress = self.data.deliveryAddress;
            deliveryAddress._account = authService.getUser()._id;
            $rootScope.messages = {};
            deliveryAddressService.insert(deliveryAddress, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.creditCard = {};
                    $rootScope.messages.success = message;
                    $location.path('/deliveryaddresses');
                }
            });
        };

        self.init();
    }]);
