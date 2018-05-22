'use strict';

appControllers.controller('TopRatedProductController', ['$scope', 'ShopService', function ($scope, ShopService) {
    const self = this;
    self.products = {};

    self.getProducts = () => {
        ShopService.getProductsTopRated(self.updateProducts);
    };

    $scope.$watch(() => {
        return ShopService.products;
    }, () => {
        ShopService.getProductsTopRated(self.updateProducts);
    }, false);

    self.updateProducts = (error, data) => {
        if(data) {
            let products = data.products;
            self.products = products;
        }
    };

    self.getProducts();
}]);
