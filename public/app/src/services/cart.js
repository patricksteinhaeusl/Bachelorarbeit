'use strict';

appServices.service('CartService', ['localStorageService', function (LocalStorageService) {

    let self = this;

    self.items = JSON.parse(LocalStorageService.get('items'));

    self.calculateTotalPrice = () => {
        let sum = 0;
        if (self.items) {
            self.items.forEach((element) => {
                sum += element.product.price * element.quantity;
            });
        }
        return sum;
    };

    self.totalPrice = self.calculateTotalPrice();

    self.getTotalPrice = () => {
        return self.calculateTotalPrice();
    };

    self.getItems = () => {
        return self.items;
    };

    self.insert = (product, quantity, callback) => {
        if(!quantity) {
            quantity = 1;
        }

        let found = false;
        let item = {
            quantity: quantity,
            product: product
        };

        self.items.forEach((element) => {
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

    self.remove = (itemIndex, callback) => {
        self.items.splice(itemIndex, 1);
        LocalStorageService.set('items', JSON.stringify(self.items));
        return callback(null, 'Item successfully removed from cart.');
    };

    self.clear = () => {
        self.items = [];
        LocalStorageService.set('items', '[]');
        self.totalPrice = 0;
    };

    return self;
}]);
