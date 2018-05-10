'use strict';

appControllers.controller('ProductSearchController', ['$rootScope', '$scope', '$location', 'ShopService',
    function ($rootScope, $scope, $location, ShopService) {
        const self = this;
        self.data = {};
        self.data.products = {};
        self.searchValues = [];
        self.searchValue = null;

        self.getProducts = function() {
            $location.path('/shop');
            ShopService.getProductsBySearchValue(self.searchValue, function (products) {
                self.data.products = products;
            });
        };

        self.getProductsBySearchValue = function(searchValue) {
            $location.path('/shop');
            ShopService.getProductsBySearchValue(searchValue, function (products) {
                self.data.products = products;
            });
        };

        $scope.$watch(function() {
            return ShopService.searchValues;
        }, function(searchValues) {
            self.searchValues = searchValues;
        }, false);


        $scope.$watch(function() {
            return ShopService.searchValue;
        }, function(searchValue) {
            self.searchValue = searchValue;
        }, false);

    }]).directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });
                    event.preventDefault();
                }
            });
        };
    });
