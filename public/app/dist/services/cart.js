'use strict';

appServices.service('CartService', ['localStorageService', function (LocalStorageService) {

    var self = this;

    self.items = JSON.parse(LocalStorageService.get('items'));

    self.calculateTotalPrice = function () {
        var sum = 0;
        if (self.items) {
            self.items.forEach(function (element) {
                sum += element.product.price * element.quantity;
            });
        }
        return sum;
    };

    self.totalPrice = self.calculateTotalPrice();

    self.getTotalPrice = function () {
        return self.calculateTotalPrice();
    };

    self.getItems = function () {
        return self.items;
    };

    self.insert = function (product, quantity, callback) {
        if (!quantity) {
            quantity = 1;
        }

        var found = false;
        var item = {
            quantity: quantity,
            product: product
        };

        self.items.forEach(function (element) {
            if (element.product._id === item.product._id) {
                found = true;
                element.quantity += quantity;
            }
        });

        if (!found) {
            self.items.push(item);
        }

        LocalStorageService.set('items', JSON.stringify(self.items));

        return callback(null, 'Item successfully added to cart.');
    };

    self.remove = function (itemIndex, callback) {
        self.items.splice(itemIndex, 1);
        LocalStorageService.set('items', JSON.stringify(self.items));
        return callback(null, 'Item successfully removed from cart.');
    };

    self.clear = function () {
        self.items = [];
        LocalStorageService.set('items', '[]');
        self.totalPrice = 0;
    };

    return self;
}]);