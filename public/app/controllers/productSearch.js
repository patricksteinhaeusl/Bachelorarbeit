'use strict';

appControllers.controller('ProductSearchController', ['$scope', '$routeParams', '$timeout', '$location', 'ShopService',
    function ($scope, $routeParams, $timeout, $location, ShopService) {
        const self = this;
        self.products = {};
        self.searchValues = [];
        self.searchValue = ShopService.getSearchValue();

        self.getProducts = function() {
            $location.path('/shop');
            $timeout(function() {
                ShopService.getProductsBySearchValue(self.searchValue, function (error, data) {
                    if(data) {
                        let products = data.products;
                        self.products = products;
                    }
                });
            }, 50);
        };

        self.getProductsBySearchValue = function(searchValue) {
            $location.path('/shop');
            $timeout(function() {
                ShopService.getProductsBySearchValue(searchValue, function (error, data) {
                    if(data) {
                        let products = data.products;
                        self.products = products;
                    }
                });
            }, 50);
        };

        $scope.$watch(function() {
            return ShopService.searchValue;
        }, function(searchValue) {
            self.searchValue = searchValue;
        }, false);

        $scope.$watch(function() {
            return ShopService.searchValues;
        }, function(searchValues) {
            self.searchValues = searchValues;
        }, false);
    }]);

