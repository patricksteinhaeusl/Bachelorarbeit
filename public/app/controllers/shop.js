'use strict';

appControllers.controller('ShopController', ['$rootScope', '$scope', '$location', 'AuthService', 'ShopService',
    function ($rootScope, $scope, $location, AuthService, ShopService) {
        const self = this;
        self.data = {};
        self.data.products = {};

        self.searchValue = null;
        self.searchValues = {};

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
        self.selectedQuantity = $location.search().selectedQuantity;

        self.getProducts = function() {
            ShopService.getProducts(function(products) {
                products.forEach(function(product) {
                    product.selectedQuantity = self.selectedQuantity;
                });
                self.data.products = products;
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

        self.createDropDownOptions = function() {
            $(function() {
                let selectedQuantity = getParameterByName("selectedQuantity");

                if(selectedQuantity) {
                    createDropDownOptions(selectedQuantity);
                }

                function createDropDownOptions(defaultQuantity) {
                    $('.quantity').append(
                        $('<option>', {
                            value: defaultQuantity,
                            text: defaultQuantity
                        })
                    );
                }

                function getParameterByName(name) {
                    let url = window.location.href;
                    name = name.replace(/[\[\]]/g, "\\$&");
                    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                        results = regex.exec(url);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, " "));
                }
            });
        };

        $scope.$watch(function() {
            return ShopService.products;
        }, function(products) {
            self.data.products = products;
        }, false);

        $scope.$watch(function() {
            return ShopService.productsSearchValue;
        }, function(products) {
            self.data.products = products;
        }, false);

        self.getProducts();
    }])
    .filter('trustAsHTML', ['$sce', function ($sce) {
        return function (comment) {
            return $sce.trustAs($sce.HTML, comment);
        };
    }]);
    // Injection Code End
