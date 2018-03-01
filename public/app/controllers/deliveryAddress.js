'use strict';

appControllers.controller('DeliveryAddressController', ['$rootScope', '$scope', '$location', '$timeout', '$routeParams', 'DeliveryAddressService', 'AuthService', function($rootScope, $scope, $location, $timeout, $routeParams, deliveryAddressService, authService) {
  const self = this;
  self.data = {};
  self.data.deliveryAddress = {};

  self.init = function() {
    self.getById();
  };

  self.getById = function() {
    let deliveryAddressId = $routeParams.deliveryAddressId;
    if(deliveryAddressId) {
      deliveryAddressService.getById(deliveryAddressId, function(data) {
        self.data.deliveryAddress = data;
      });
    }
  };

  self.update = function() {
    let deliveryAddress = self.data.deliveryAddress;
    $rootScope.messages = {};
    deliveryAddressService.update(deliveryAddress, function(error, data, message, validations) {
      if(error) self.update.messages.error = error;
      if(validations) self.update.validations = validations;
      if(!data) $rootScope.messages.warning = message;
      if(data) {
        self.data.creditCard = {};
        $rootScope.messages.success = message;
        $location.path('/deliveryaddresses');
      }

      $timeout(function() {
        $rootScope.messages = {};
        self.update.validations = {};
      }, 5000);
    });
  };

  self.insert = function() {
    let deliveryAddress = self.data.deliveryAddress;
    deliveryAddress._account = authService.getUser()._id;
    $rootScope.messages = {};
    deliveryAddressService.insert(deliveryAddress, function(error, data, message, validations) {
      if(error) $rootScope.messages.error = error;
      if(validations) self.insert.validations = validations;
      if(!data) $rootScope.messages.warning = message;
      if(data) {
        self.data.creditCard = {};
        $rootScope.messages.success = message;
        $location.path('/deliveryaddresses');
      }

      $timeout(function() {
        $rootScope.messages = {};
        self.insert.validations = {};
      }, 5000);
    });
  };

  self.init();
}]);
