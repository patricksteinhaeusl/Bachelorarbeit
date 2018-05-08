'use strict';

appControllers.controller('CartController', ['$rootScope', '$scope', 'CartService', function ($rootScope, $scope, cartService) {
    const self = this;

    self.data = {};
    self.data.items = cartService.getItems();
    self.data.totalPrice = cartService.getTotalPrice();

    self.insert = function (product, quantity) {
        console.log(quantity);
        $rootScope.messages = {};
        cartService.insert(product, function (error, message) {
            if(error) {
                $rootScope.messages.error = 'Adding the Item to the shopping cart failed!';
            } else {
                $rootScope.messages.success = message;
            }
        });
    };

    self.remove = function (itemIndex) {
        cartService.remove(itemIndex);
    };

    $scope.$watch(function () {
        return cartService.getItems()
    }, function (items) {
        self.data.items = cartService.getItems();
        self.data.totalPrice = cartService.getTotalPrice();
    }, true);
}]);
