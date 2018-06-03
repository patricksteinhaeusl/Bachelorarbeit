'use strict';

appControllers.controller('CartController', ['$rootScope', '$scope', 'CartService', 'AlertsService', function ($rootScope, $scope, CartService, AlertsService) {
    var self = this;

    self.data = {};
    self.data.items = CartService.getItems();
    self.data.totalPrice = CartService.getTotalPrice();

    self.insert = function (product, quantity) {
        var quantityNumber = Number(quantity);
        CartService.insert(product, quantityNumber, self.updateRootScope);
    };

    self.remove = function (itemIndex) {
        CartService.remove(itemIndex, self.updateRootScope);
    };

    self.updateRootScope = function (error, message) {
        if (message) {
            AlertsService.addSuccess(message);
        }
    };

    $scope.$watch(function () {
        return CartService.getItems();
    }, function (items) {
        self.data.items = items;
        self.data.totalPrice = CartService.getTotalPrice();
    }, true);
}]);