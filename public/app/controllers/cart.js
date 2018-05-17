'use strict';

appControllers.controller('CartController', ['$rootScope', '$scope', 'CartService', function ($rootScope, $scope, CartService) {
    const self = this;

    self.data = {};
    self.data.items = CartService.getItems();
    self.data.totalPrice = CartService.getTotalPrice();

    self.insert = function (product, quantity) {
        let quantityNumber = Number(quantity);
        CartService.insert(product, quantityNumber, function (error, message) {
            if(message) {
                $rootScope.messages.successes.push(message);
            }
        });
    };

    self.remove = function (itemIndex) {
        CartService.remove(itemIndex, function(error, message) {
            if(message) {
                $rootScope.messages.successes.push(message);
            }
        });
    };

    $scope.$watch(function () {
        return CartService.getItems()
    }, function (items) {
        self.data.items = items;
        self.data.totalPrice = CartService.getTotalPrice();
    }, true);
}]);
