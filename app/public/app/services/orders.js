'use strict';

appServices.factory('OrdersService', ['$http', '$q', function ($http, $q) {
  return {
    getAllByAccount: function(accountId, callback) {
      $http
        .get('http://localhost:3000/api/order/account/' + accountId)
        .then(function(response) {
          let orders = response.data.data.orders;
          if(orders) {
            return callback(orders);
          } else {
            return callback(false);
          }
        }, function(response) {
          return callback(false);
        });
    }
  };
}]);