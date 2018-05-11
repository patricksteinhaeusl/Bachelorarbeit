'use strict';

appControllers.controller('ProductSearchController', ['$rootScope', '$scope', '$timeout', '$location', 'ShopService',
    function ($rootScope, $scope, $timeout, $location, ShopService) {
        const self = this;
        self.products = {};
        self.searchValues = [];
        self.searchValue = null;

        self.getProducts = function() {
            $location.path('/shop');
            $timeout(function() {
                ShopService.getProductsBySearchValue(self.searchValue, function (products) {
                    self.products = products;
                });
            }, 50);
        };

        self.getProductsBySearchValue = function(searchValue) {
            $location.path('/shop');
            $timeout(function() {
                ShopService.getProductsBySearchValue(searchValue, function (products) {
                    self.products = products;
                });
            }, 50);
        };

        $scope.$watch(function() {
            return ShopService.searchValues;
        }, function(searchValues) {
            self.searchValues = searchValues;
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
