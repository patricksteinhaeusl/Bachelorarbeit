'use strict';

appControllers.controller('OrderController', ['$scope', '$location', 'OrderService', 'AuthService', 'CartService',function ($scope, $location, OrderService, AuthService, CartService) {
    const self = this;

    self.data = {};
    self.data.order = {};
    self.data.order._deliveryAddress = {};
    self.data.order.payment = {};
    self.data.order.payment.type = null;
    self.data.order.payment.creditCard = null;

    self.init = () => {
        if(AuthService.isAuthenticated()) {
            let accountId = AuthService.getUser()._id;
            OrderService.getTemp(accountId, (error, data) => {
                if(data) {
                    let order = data.order;
                    self.data.order = order;
                } else {
                    self.data.order = {};
                }
            });
        } else {
            self.data.order = {};
        }
    };

    self.createTemp = () => {
        let items = CartService.getItems();
        let totalPrice = CartService.getTotalPrice();
        let account = AuthService.getUser()._id;
        OrderService.createTemp(items, totalPrice, account, (error, data) => {
            if (data) {
                let order = data.order;
                self.data.order = order;
                $location.path('/checkout/overview');
            }
        });
    };

    self.updateTemp = () => {
        OrderService.updateTemp(self.data.order, (error, data) => {
            if (data) {
                let order = data.order;
                self.data.order = order;
            }
        });
    };

    self.save = () => {
        if (self.data.order.payment.type === 'bill') {
            self.data.order.status = 'ready for payment';
        } else if (self.data.order.payment.type === 'creditCard') {
            self.data.order.status = 'ready for delivery';
        }
        OrderService.save(self.data.order, (error, data) => {
            if (data) {
                CartService.clear();
                self.data.order = {};
                $location.path('/orders');
            }
        });
    };

    self.goToOverview = () => {
        if (self.data.order._id) {
            $location.path('/checkout/overview');
        }
    };

    self.goToAddress = () => {
        if (self.data.order._id) {
            $location.path('/checkout/address');
        }
    };

    self.goToPayment = () => {
        if (self.data.order._id) {
            $location.path('/checkout/payment');
        }
    };

    self.changePayment = () => {
        if(self.data.order.payment.type === 'bill') {
            delete self.data.order.payment._creditCard;
        }
    };

    $scope.$watch(() => {
        return self.data.order._id
    }, (id) => {
        if (!id && self.save.active === false) {
            self.data.order = {};
            $location.path('/shop');
        }
    });

    $scope.$watch(() => {
        return CartService.getItems()
    }, (items) => {
        self.data.order.items = items;
        self.data.order.totalPrice = CartService.getTotalPrice();
    }, true);

    self.init();

}]);
