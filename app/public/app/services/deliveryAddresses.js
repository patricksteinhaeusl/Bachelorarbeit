'use strict';

appServices.factory('DeliveryAddressesService', ['$http', function ($http) {
  return {
    getAllByAccount: function(account, callback) {
      $http
        .get('http://localhost:3000/api/deliveryaddress/account/' + account._id)
        .then(function(response) {
          let deliveryAddresses = response.data.data.deliveryAddresses;
          if(deliveryAddresses) {
            return callback(deliveryAddresses);
          } else {
            return callback(false);
          }
        }, function(response) {
          return callback(false);
        });
    },
    remove: function(deliveryAddressId, callback) {
      $http
        .delete('http://localhost:3000/api/deliveryaddress/' + deliveryAddressId)
        .then(function(response) {
          return callback(true);
        }, function(response) {
          return callback(false);
        });
    }
  };
}]);