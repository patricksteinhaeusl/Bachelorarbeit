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
        getFromTo: function (from, to, callback) {
            $http
                .get('/api/order/from/' + from + '/to/' + to)
                .then(function (response) {
                    let from = response.data.from;
                    let to = response.data.to;
                    let result = { "from": from.toString(), "to": to.toString() };
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
