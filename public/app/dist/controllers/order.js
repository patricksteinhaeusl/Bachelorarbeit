'use strict';

appControllers.controller('OrderController', ['$scope', '$location', 'OrderService', 'AuthService', 'CartService', function ($scope, $location, OrderService, AuthService, CartService) {
    var self = this;

    self.data = {};
    self.data.order = {};
    self.data.order._deliveryAddress = {};
    self.data.order.payment = {};
    self.data.order.payment.type = null;
    self.data.order.payment.creditCard = null;

    self.init = function () {
        if (AuthService.isAuthenticated()) {
            var accountId = AuthService.getUser()._id;
            OrderService.getTemp(accountId, function (error, data) {
                if (data) {
                    var order = data.order;
                    self.data.order = order;
                } else {
                    self.data.order = {};
                }
            });
        } else {
            self.data.order = {};
        }
    };

    self.createTemp = function () {
        var items = CartService.getItems();
        var totalPrice = CartService.getTotalPrice();
        var account = AuthService.getUser()._id;
        OrderService.createTemp(items, totalPrice, account, function (error, data) {
            if (data) {
                var order = data.order;
                self.data.order = order;
                $location.path('/checkout/overview');
            }
        });
    };

    self.updateTemp = function () {
        OrderService.updateTemp(self.data.order, function (error, data) {
            if (data) {
                var order = data.order;
                self.data.order = order;
            }
        });
    };

    self.save = function () {
        if (self.data.order.payment.type === 'bill') {
            self.data.order.status = 'ready for payment';
        } else if (self.data.order.payment.type === 'creditCard') {
            self.data.order.status = 'ready for delivery';
        }
        OrderService.save(self.data.order, function (error, data) {
            if (data) {
                CartService.clear();
                self.data.order = {};
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

    self.changePayment = function () {
        if (self.data.order.payment.type === 'bill') {
            delete self.data.order.payment._creditCard;
        }
    };

    $scope.$watch(function () {
        return self.data.order._id;
    }, function (id) {
        if (!id && self.save.active === false) {
            self.data.order = {};
            $location.path('/shop');
        }
    });

    $scope.$watch(function () {
        return CartService.getItems();
    }, function (items) {
        self.data.order.items = items;
        self.data.order.totalPrice = CartService.getTotalPrice();
    }, true);

    self.init();
}]);