'use strict';

appControllers.controller('ShopCategoryController', ['$rootScope', '$scope', '$routeParams', 'AuthService', 'ShopService', 'AlertsService',
    function ($rootScope, $scope, $routeParams, AuthService, ShopService, AlertsService) {
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
        self.categoryId = $routeParams.categoryId;

        self.getProducts = () => {
            ShopService.getProductsCategory(self.categoryId, (error, data) => {
                if(data) {
                    let products = data.products;
                    self.products = products;
                }
            });
        };

        self.rateProduct = (product, rating) => {
            rating._account = AuthService.getUser()._id;
            if(rating.value >= 1) {
                ShopService.rateProduct(product, rating, (error, data) => {
                    if(data) {
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

        self.collapseRatingForm = (productIndex) => {
            let div = $('#shop-form-rating-' + productIndex);
            if (div.is(':visible')) {
                $('.shop-form-rating').slideUp();
            } else {
                $('.shop-form-rating').slideUp();
                div.slideDown();
                div.css('display', 'inline-block');
            }
        };

        self.changeOrientation = (orientation) => {
            self.productOrientation = orientation;
        };

        $scope.$watch(() => {
            return ShopService.searchValue;
        }, (searchValue) => {
            self.searchValue = searchValue;
        }, false);

        $scope.$watch(() => {
            return ShopService.products;
        }, (products) => {
            self.products = products;
        }, false);

        $scope.$watch(() => {
            return $routeParams.selectedQuantity;
        }, (selectedQuantity) => {
            ShopService.selectedQuantity = selectedQuantity;
        }, true);

        self.getProducts();
    }]);
