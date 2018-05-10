'use strict';

appControllers.controller('LatestProductController', ['$rootScope', '$scope', 'ShopService',
    function ($rootScope, $scope, ShopService) {
        const self = this;
        self.data = {};
        self.data.products = {};

        self.getProducts = function() {
            ShopService.getProductsLatest(function(products) {
                self.data.products = products;
            });
        };

        $scope.$watch(function() {
            return ShopService.products;
        }, function(products) {
            self.data.products = products;
        }, false);

        self.getProducts();
    }]);