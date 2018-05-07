'use strict';

appControllers.controller('OrderController', ['$rootScope', '$scope', '$location', 'OrderService', 'AuthService', 'CartService',
    function ($rootScope, $scope, $location, orderService, authService, cartService) {
        const self = this;

        self.data = {};
        self.data.order = {};
        self.data.order._deliveryAddress = {};
        self.data.order.payment = {};
        self.data.order.payment.type = null;
        self.data.order.payment.creditCard = null;

        self.init = function() {
            if(authService.isAuthenticated()) {
                let accountId = authService.getUser()._id;
                orderService.getTemp(accountId, function (error, data) {
                    if (error) $rootScope.messages.error = error;
                    if (!data) {
                        self.data.order = {};
                    } else {
                        self.data.order = data.order;
                    }
                });
            } else {
                self.data.order = {};
            }
        };

        self.createTemp = function () {
            $rootScope.messages = {};
            let items = cartService.getItems();
            let totalPrice = cartService.getTotalPrice();
            let account = authService.getUser()._id;
            orderService.createTemp(items, totalPrice, account, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.order = data.order;
                    $rootScope.messages.success = message;
                    $location.path('/checkout/overview');
                }
            });
        };

        self.updateTemp = function () {
            $rootScope.messages = {};
            orderService.updateTemp(self.data.order, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validation = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.order = data.order;
                    $rootScope.messages.success = message;
                }
            });
        };

        self.save = function () {
            if (self.data.order.payment.type === 'bill') {
                self.data.order.status = 'ready for payment';
            } else if (self.data.order.payment.type === 'creditCard') {
                self.data.order.status = 'ready for delivery';
            }
            $rootScope.messages = {};
            orderService.save(self.data.order, function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    cartService.clear();
                    self.data.order = {};
                    $rootScope.messages.success = message;
                    $location.path('/orders');
                }
            });
        };

        self.goToOverview = function () {
            if (self.data.order._id) {
                $location.path('/checkout/overview');
            }
        };

        self.goToAddress = function () {
            if (self.data.order._id) {
                $location.path('/checkout/address');
            }
        };

        self.goToPayment = function () {
            if (self.data.order._id) {
                $location.path('/checkout/payment');
            }
        };

        self.changePayment = function() {
            if(self.data.order.payment.type === 'bill') {
                delete self.data.order.payment._creditCard;
            }
        };

        $scope.$watch(function () {
            return self.data.order._id
        }, function (id) {
            if (!id && self.save.active === false) {
                self.data.order = {};
                $location.path('/shop');
            }
        });

        $scope.$watch(function () {
            return cartService.getItems()
        }, function (items) {
            self.data.order.items = cartService.getItems();
            self.data.order.totalPrice = cartService.getTotalPrice();
        }, true);

        self.init();

    }]);
