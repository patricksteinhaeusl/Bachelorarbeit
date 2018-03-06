'use strict';

appControllers.controller('CartController', ['$rootScope', '$scope', '$timeout', 'CartService', function ($rootScope, $scope, $timeout, cartService) {
    const self = this;

    self.data = {};
    self.data.items = cartService.getItems();
    self.data.totalPrice = cartService.getTotalPrice();

    self.insert = function (product) {
        $rootScope.messages = {};
        cartService.insert(product, function (error, message) {
            if(error) {
                $rootScope.messages.error = 'Adding the Item to the shopping cart failed!';
            } else {
                $rootScope.messages.success = message;
            }

            $timeout(function () {
                $rootScope.messages = {};
            }, 5000);
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
