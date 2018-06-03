'use strict';

appControllers.controller('ProductSearchController', ['$scope', '$routeParams', '$timeout', '$location', 'ShopService', function ($scope, $routeParams, $timeout, $location, ShopService) {
    var self = this;
    self.products = {};
    self.searchValues = [];
    self.searchValue = ShopService.getSearchValue();

    self.getProducts = function () {
        $location.path('/shop').search('selectedQuantity', '1');
        $timeout(function () {
            ShopService.getProductsBySearchValue(self.searchValue, self.updateProducts);
        }, 50);
    };

    self.getProductsBySearchValue = function (searchValue) {
        $location.path('/shop').search('selectedQuantity', '1');
        $timeout(function () {
            ShopService.getProductsBySearchValue(searchValue, self.updateProducts);
        }, 50);
    };

    self.updateProducts = function (error, data) {
        if (data) {
            var products = data.products;
            self.products = products;
        }
    };

    $scope.$watch(function () {
        return ShopService.searchValue;
    }, function (searchValue) {
        self.searchValue = searchValue;
    }, false);

    $scope.$watch(function () {
        return ShopService.searchValues;
    }, function (searchValues) {
        self.searchValues = searchValues;
    }, false);
}]);