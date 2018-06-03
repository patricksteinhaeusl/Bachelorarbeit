'use strict';

appControllers.controller('ShopController', ['$rootScope', '$scope', '$routeParams', 'AuthService', 'ShopService', 'AlertsService', function ($rootScope, $scope, $routeParams, AuthService, ShopService, AlertsService) {
    var self = this;
    self.products = {};

    self.sort = {
        name: {
            label: 'Name',
            query: '+name'
        },
        category: {
            label: 'Category',
            query: '+category.name'
        },
        price: {
            label: 'Price',
            query: '+price'
        },
        size: {
            label: 'Size',
            query: '+size'
        },
        rating: {
            label: 'Rating',
            query: '-rating.value'
        }
    };
    self.selectedSort = self.sort.name.query;
    self.productOrientation = 'wide';

    self.getProducts = function () {
        ShopService.getProducts(function (error, data) {
            if (data) {
                var products = data.products;
                self.products = products;
            }
        });
    };

    self.rateProduct = function (product, rating) {
        rating._account = AuthService.getUser()._id;
        if (rating.value >= 1) {
            ShopService.rateProduct(product, rating, function (error, data) {
                if (data) {
                    self.ratingByAccount = {};
                    self.ratingEmptyByAccount = {};
                    $('.shop-form-rating').slideUp();
                    self.getProducts();
                }
            });
        } else {
            AlertsService.addWarning('Rating must be at least 1 star');
        }
    };

    self.collapseRatingForm = function (productIndex) {
        var div = $('#shop-form-rating-' + productIndex);
        if (div.is(':visible')) {
            $('.shop-form-rating').slideUp();
        } else {
            $('.shop-form-rating').slideUp();
            div.slideDown();
            div.css('display', 'inline-block');
        }
    };

    self.changeOrientation = function (orientation) {
        self.productOrientation = orientation;
    };

    $scope.$watch(function () {
        return ShopService.searchValue;
    }, function (searchValue) {
        self.searchValue = searchValue;
    }, false);

    $scope.$watch(function () {
        return ShopService.products;
    }, function (products) {
        self.products = products;
    }, false);

    $scope.$watch(function () {
        return $routeParams.selectedQuantity;
    }, function (selectedQuantity) {
        ShopService.selectedQuantity = selectedQuantity;
    }, true);

    self.getProducts();
}]);