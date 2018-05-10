'use strict';

appControllers.controller('TopRatedProductController', ['$rootScope', '$scope', 'ShopService',
    function ($rootScope, $scope, ShopService) {
        const self = this;
        self.data = {};
        self.data.products = {};

        self.getProducts = function() {
            ShopService.getProductsTopRated(function(products) {
                self.data.products = products;
            });
        };

        $scope.$watch(function() {
            return ShopService.products;
        }, function(products) {
            self.data.products = products;
        }, false);

        $scope.$watch(function() {
            return ShopService.productsCategory;
        }, function() {
            self.data.products = ShopService.getProducts(function(products) {
                self.data.products = products;
            });
        }, false);

        self.getProducts();
    }]);
