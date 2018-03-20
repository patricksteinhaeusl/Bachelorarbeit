'use strict';

appControllers.controller('SocketsController', ['$scope', 'SocketsService', function ($scope, socketsService) {
    const self = this;
    self.data = {};
    self.data.currentCustomer = {};
    self.data.newCustomers = [];

    self.join = function() {
        socketsService.emit('join', { customer: self.data.currentCustomer });
    };

    socketsService.on('notification', function(data) {
        $scope.$apply(function () {
            self.data.newCustomers.push(data.customer);
        });
    });

    socketsService.on('connected', function (data) {
        console.log(data);
    });
}]);
