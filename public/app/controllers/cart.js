'use strict';

appControllers.controller('CartController', ['$rootScope', '$scope', 'CartService', function ($rootScope, $scope, CartService) {
    const self = this;

    self.data = {};
    self.data.items = CartService.getItems();
    self.data.totalPrice = CartService.getTotalPrice();

    self.insert = (product, quantity) => {
        let quantityNumber = Number(quantity);
        CartService.insert(product, quantityNumber, self.updateRootScope);
    };

    self.remove = (itemIndex) => {
        CartService.remove(itemIndex, self.updateRootScope);
    };

    self.updateRootScope = (error, message) => {
        if(message) {
            $rootScope.messages.successes.push({msg: message});
        }
    };

    $scope.$watch(() => {
        return CartService.getItems()
    }, (items) => {
        self.data.items = items;
        self.data.totalPrice = CartService.getTotalPrice();
    }, true);
}]);
