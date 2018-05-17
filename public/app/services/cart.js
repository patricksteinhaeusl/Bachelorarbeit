'use strict';

appServices.service('CartService', ['$http', 'localStorageService', function ($http, localStorageService) {

    let self = this;

    self.items = JSON.parse(localStorageService.get('items'));

    self.calculateTotalPrice = function () {
        let sum = 0;
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
        if(!quantity) {
            quantity = 1;
        }

        let found = false;
        let item = {
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

        localStorageService.set('items', JSON.stringify(self.items));

        return callback(null, 'Item successfully added to cart.');
    };

    self.remove = function (itemIndex, callback) {
        self.items.splice(itemIndex, 1);
        localStorageService.set('items', JSON.stringify(self.items));
        return callback(null, 'Item successfully removed from cart.');
    };

    self.clear = function () {
        self.items = [];
        localStorageService.set('items', '[]');
        self.totalPrice = 0;
    };

    return self;
}]);
