'use strict';

appControllers.controller('TopRatedProductController', ['$scope', 'ShopService',
    function ($scope, ShopService) {
        const self = this;
        self.products = {};

        self.getProducts = function() {
            ShopService.getProductsTopRated(function(error, data) {
                if(data) {
                    let products = data.products;
                    self.products = products;
                }
            });
        };

        $scope.$watch(function() {
            return ShopService.products;
        }, function() {
            ShopService.getProductsTopRated(function(error, data) {
                if(data) {
                    let products = data.products;
                    self.products = products;
                }
            });
        }, false);

        self.getProducts();
    }]);
