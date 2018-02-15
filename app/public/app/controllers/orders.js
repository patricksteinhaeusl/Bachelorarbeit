'use strict';

appControllers.controller('OrdersController', ['$scope', 'OrdersService', 'AuthService', function($scope, ordersService, authService) {
  const self = this;

  self.data = {};
  self.data.orders = {};

  self.init = function() {
    self.getAllByAccount();
  };

  self.getAllByAccount = function() {
    ordersService.getAllByAccount(authService.getUser()._id, function(orders) {
      self.data.orders = orders;
    });
  };

  self.init();

}]);