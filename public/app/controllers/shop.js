'use strict';

appControllers.controller('ShopController', ['$rootScope', '$scope', '$routeParams', 'AuthService', 'ShopService',
    function ($rootScope, $scope, $routeParams, AuthService, ShopService) {
        const self = this;
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
        self.selectedQuantity = $routeParams.selectedQuantity;

        self.getProducts = function() {
            ShopService.getProducts(function(products) {
                self.products = products;
                self.products.forEach(function(product) {
                    product.selectedQuantity = self.selectedQuantity;
                });
            });
        };

        self.rateProduct = function (product, rating) {
            rating._account = AuthService.getUser()._id;
            $rootScope.messages = {};
            if(rating.value >= 1) {
                ShopService.rateProduct(product, rating, function (error, data, message, validations) {
                    if (error) $rootScope.messages.error = error;
                    if (validations) {
                        $rootScope.messages.validations = validations;
                        self.ratingByAccount = {};
                        self.ratingEmptyByAccount = {};
                    }
                    $rootScope.messages.success = message;
                    $('.shop-form-rating').slideUp();
                });
            } else {
                $rootScope.messages.warning = "Rating must be at least 1 star";
            }
        };

        self.collapseRatingForm = function (productIndex) {
            let div = $('#shop-form-rating-' + productIndex);
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

        $scope.$watch(function() {
            return ShopService.searchValue;
        }, function(searchValue) {
            self.searchValue = searchValue;
        }, false);

        $scope.$watch(function() {
            return ShopService.productsSearchValue;
        }, function(products) {
            self.products = products;
        }, false);

        $scope.$watch(function() {
            return $routeParams.selectedQuantity;
        }, function(selectedQuantity) {
            self.selectedQuantity = selectedQuantity;
        }, true);

        $scope.$watch(function() {
            return ShopService.products;
        }, function(products) {
            self.products = products;
        }, false);

        self.getProducts();

    }]).filter('trustAsHTML', ['$sce', function ($sce) {
        return function (comment) {
            return $sce.trustAs($sce.HTML, comment);
        };
    }]).directive('addOptions', ['$routeParams', function($routeParams) {

        function link(scope, element) {
            scope.$watch(function () {
                return $routeParams.selectedQuantity;
            }, function (selectedQuantity) {
                let options = element.find('option');
                angular.forEach(options, function (element) {
                    if (element.value === selectedQuantity) {
                        element.remove();
                    }
                });
                element.prepend('<option value=' + selectedQuantity + ' selected>' + selectedQuantity + '</option>');
            }, false);
        }

        return {
            link: link
        };

    }]);

