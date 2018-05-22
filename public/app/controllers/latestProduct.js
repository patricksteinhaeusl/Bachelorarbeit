'use strict';

appControllers.controller('LatestProductController', ['$scope', 'ShopService', function ($scope, ShopService) {
    const self = this;
    self.products = {};

    self.getProducts = () => {
        ShopService.getProductsLatest(self.updateProducts);
    };

    $scope.$watch(() => {
        return ShopService.products;
    }, () => {
        ShopService.getProductsLatest(self.updateProducts);
    }, false);

    self.updateProducts = (error, data) => {
        if(data) {
            let products = data.products;
            self.products = products;
        }
    };

    self.getProducts();
}]);
