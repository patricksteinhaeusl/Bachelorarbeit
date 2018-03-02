'use strict';

appServices.service('CartService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

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

    self.insert = function (product) {
        let found = false;
        let item = {
            quantity: 1,
            product: product
        };

        self.items.forEach(function (element) {
            if (element.product._id === item.product._id) {
                found = true;
                element.quantity++;
                break;
            }
        });

        if (!found) {
            self.items.push(item);
        }

        localStorageService.set('items', JSON.stringify(self.items));
    };

    self.remove = function (itemIndex) {
        self.items.splice(itemIndex, 1);
        localStorageService.set('items', JSON.stringify(self.items));
    };

    self.clear = function () {
        self.items = [];
        localStorageService.set('items', '[]');
        self.totalPrice = 0;
    };

    return self;
}]);
