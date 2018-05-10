'use strict';

appControllers.controller('LatestProductController', ['$rootScope', '$scope', 'ShopService',
    function ($rootScope, $scope, ShopService) {
        const self = this;
        self.products = {};

        self.getProducts = function() {
            ShopService.getProductsLatest(function(products) {
                self.products = products;
            });
        };

        $scope.$watch(function() {
            return ShopService.products;
        }, function(products) {
            self.products = products;
        }, false);

        $scope.$watch(function() {
            return ShopService.productsCategory;
        }, function() {
            ShopService.getProducts(function(products) {
                self.products = products;
            });
        }, false);

        self.getProducts();
    }]);
