'use strict';

appServices.factory('OrdersService', ['$http', '$q', function ($http, $q) {
    return {
        getAllByAccount: function (accountId, callback) {
            $http
                .get('/api/order/account/' + accountId)
                .then(function (response) {
                    let orders = response.data.data.orders;
                    if (orders) {
                        return callback(orders);
                    } else {
                        return callback(false);
                    }
                }, function (response) {
                    return callback(false);
                });
        },
        getFromTo: function (from, range, callback) {
            $http
                .get('/api/order/from/' + from + '/range/' + range)
                .then(function (response) {
                    let from = response.data.from;
                    let to = response.data.to;
                    let result = { "from": from, "to": to };
                    if (result) {
                        return callback(result);
                    } else {
                        return callback(false);
                    }
                }, function (response) {
                    return callback(false);
                });
        }
    };
}]);
