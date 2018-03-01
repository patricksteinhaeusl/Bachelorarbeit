'use strict';

appControllers.controller('OrderController', ['$scope', '$location', 'OrderService', 'AuthService', 'CartService', function($scope, $location, orderService, authService, cartService) {
  const self = this;

  self.data = {};
  self.data.order = {};
  self.data.order.deliveryAddress = {};
  self.data.order.payment = {};
  self.data.order.payment.type = 'afach Epis';
  self.data.order.payment.creditCard = null;

  self.createOrder = function() {
    orderService.create(function(error, order) {
      if(error) return console.log(error);
      self.data.order = order;
      self.data.order.items = cartService.getItems();
      self.data.order.totalPrice = cartService.getTotalPrice();

      if(self.data.order._id) {
        $location.path( '/checkout/overview' );
      }
    });
  };

  self.goToOverview = function() {
    if(self.data.order._id) {
      $location.path( '/checkout/overview' );
    }
  };

  self.goToAddress = function() {
    if(self.data.order._id) {
      $location.path( '/checkout/address' );
    }
  };

  self.goToPayment = function() {
    if(self.data.order._id) {
      $location.path( '/checkout/payment' );
    }
  };

  self.save = function() {
    self.save.active = true;
    self.data.order._account = authService.getUser()._id;
    if(self.data.order.payment.type === 'bill') {
      self.data.order.status = 'ready for payment';
    } else if(self.data.order.payment.type === 'creditCard') {
      self.data.order.status = 'ready for delivery';
    }

    orderService.save(self.data.order, function(error, order) {
      if(error) return console.log(error);
      cartService.clear();
      self.data.order = {};
      $location.path( '/orders' );
    });
  };

  self.save.active = false;

  self.changePayment = function() {
    if(self.data.order.payment && self.data.order.payment.creditCard) delete self.data.order.payment.creditCard;
  };

  $scope.$watch(function() { return self.data.order._id }, function(id) {
    if(!id && self.save.active === false) {
      self.data.order = {};
      $location.path( '/shop' );
    }
  });

  $scope.$watch(function() { return cartService.getItems() }, function(items) {
    self.data.order.items = cartService.getItems();
    self.data.order.totalPrice = cartService.getTotalPrice();
  }, true);

}]);
