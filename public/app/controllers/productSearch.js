'use strict';

appControllers.controller('ProductSearchController', ['$rootScope', '$scope', '$routeParams', '$timeout', '$location', 'ShopService',
    function ($rootScope, $scope, $routeParams, $timeout, $location, ShopService) {
        const self = this;
        self.products = {};
        self.searchValues = [];
        self.searchValue = null;

        self.getProducts = function() {
            $location.path('/shop');
            $timeout(function() {
                ShopService.getProductsBySearchValue(self.searchValue, function (products) {
                    self.products = products;
                    self.searchValue = null;
                });
            }, 50);
        };

        self.getProductsBySearchValue = function(searchValue) {
            $location.path('/shop');
            $timeout(function() {
                ShopService.getProductsBySearchValue(searchValue, function (products) {
                    self.products = products;
                    self.searchValue = null;
                });
            }, 50);
        };

        $scope.$watch(function() {
            return ShopService.searchValues;
        }, function(searchValues) {
            self.searchValues = searchValues;
        }, false);

        $scope.$watch(function() {
            return $routeParams.selectedQuantity;
        }, function(selectedQuantity) {
            ShopService.selectedQuantity = selectedQuantity;
        }, true);

    }]);

