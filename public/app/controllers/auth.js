'use strict';

appControllers.controller('AuthController', ['$rootScope', '$scope', '$location', '$timeout', 'AuthService', function($rootScope, $scope, $location, $timeout, authService) {
  let self = this;
  self.data = {};
  self.data.login = {};
  self.data.register = {};

  self.login = function() {
    let user = self.data.login.user;
    $rootScope.messages = {};
    authService.login(user, function(error, data, message, validations) {
      if(error) $rootScope.messages.error = error;
      if(validations) self.login.validations = validations;
      if(!data) $rootScope.messages.warning = message;
      if(data) {
        $rootScope.messages.success = message;
        self.data.login.user = {};
      }

      $timeout(function() {
        $rootScope.messages = {};
        self.login.validations = {};
      }, 5000);
    });
  };

  self.register = function() {
    let account = self.data.register.account;
    $rootScope.messages = {};
    authService.register(account, function(error, data, message, validations) {
      if(error) $rootScope.messages.error = error;
      if(validations) self.register.validations = validations;
      if(!data) $rootScope.warning = message;
      if(data) {
        self.data.register.account = {};
        $rootScope.messages.success = message;
        $location.path('/shop');
      }

      $timeout(function() {
        $rootScope.messages = {};
        self.login.validations = {};
      }, 5000);
    });
  };

  self.logout = function() {
    $rootScope.messages = {};
    authService.logout(function(error, data, message) {
      if(error) $rootScope.messages.error = error;
      if(!data) $rootScope.messages.warning = message;
      if(data) {
        $rootScope.messages.success = message;
        $location.path('/home');
      }

      $timeout(function() {
        $rootScope.messages = {};
      }, 5000);
    });
  };

  self.isAuthenticated = authService.isAuthenticated;

  self.getUser = authService.getUser;

}]);
