'use strict';

appControllers.controller('ProductSearchController', ['$scope', '$routeParams', '$timeout', '$location', 'ShopService',
    function ($scope, $routeParams, $timeout, $location, ShopService) {
        const self = this;
        self.products = {};
        self.searchValues = [];
        self.searchValue = ShopService.getSearchValue();

        self.getProducts = () => {
            $location.path('/shop').search('selectedQuantity', '1');
            $timeout(() => {
                ShopService.getProductsBySearchValue(self.searchValue, self.updateProducts);
            }, 50);
        };

        self.getProductsBySearchValue = (searchValue) => {
            $location.path('/shop').search('selectedQuantity', '1');
            $timeout(() => {
                ShopService.getProductsBySearchValue(searchValue, self.updateProducts);
            }, 50);
        };

        self.updateProducts = (error, data) => {
            if(data) {
                let products = data.products;
                self.products = products;
            }
        };

        $scope.$watch(() => {
            return ShopService.searchValue;
        }, (searchValue) => {
            self.searchValue = searchValue;
        }, false);

        $scope.$watch(() => {
            return ShopService.searchValues;
        }, (searchValues) => {
            self.searchValues = searchValues;
        }, false);
    }]);

