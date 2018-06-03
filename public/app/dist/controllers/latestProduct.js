'use strict';

appControllers.controller('LatestProductController', ['$scope', 'ShopService', function ($scope, ShopService) {
    var self = this;
    self.products = {};

    self.getProducts = function () {
        ShopService.getProductsLatest(self.updateProducts);
    };

    $scope.$watch(function () {
        return ShopService.products;
    }, function () {
        ShopService.getProductsLatest(self.updateProducts);
    }, false);

    self.updateProducts = function (error, data) {
        if (data) {
            var products = data.products;
            self.products = products;
        }
    };

    self.getProducts();
}]);