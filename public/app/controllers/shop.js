'use strict';

appControllers.controller('ShopController', ['$scope', '$routeParams', '$location', 'AuthService', 'ShopService',
    function ($scope, $routeParams, $location, authService, shopService) {
        const self = this;
        self.data = {};
        self.data.products = {};
        self.data.topRatedProducts = {};
        self.data.latestProducts = {};
        self.data.categories = {};
        self.data.categoryId = null;
        self.data.searchValue = null;
        self.data.searchValues = [];
        self.sort = {};
        self.data.sort = {
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
        self.data.sortSelected = self.data.sort.name.query;
        self.productOrientation = 'wide';

        self.init = function () {
            self.getProductCategories();
            self.getProducts();
        };

        self.getProducts = function () {
            self.data.categoryId = null;
            shopService.getProducts(function (products) {
                self.data.products = products;
            });
        };

        self.getProductsByCategory = function (categoryId) {
            self.data.categoryId = categoryId;
            shopService.getProductsByCategory(categoryId, function (products) {
                self.data.products = products;
            });
        };

        self.getProductsTopRated = function () {
            shopService.getProductsTopRated(function (products) {
                self.data.topRatedProducts = products;
            });
        };

        self.getProductsLatest = function () {
            shopService.getProductsLatest(function (products) {
                self.data.latestProducts = products;
            });
        };

        self.getProductsBySeachValue = function (searchValue) {
            $location.path('/shop');
            self.data.categoryId = null;
            shopService.getProductsBySearchValue(searchValue, function (products) {
                self.data.products = products;
            });
        };

        self.getProductCategories = function () {
            shopService.getProductCategories(function (categories) {
                self.data.categories = categories;
            });
        };

        self.rateProduct = function (product, rating) {
            rating._account = authService.getUser()._id;

            shopService.rateProduct(product, rating, function (result) {
                if (result) {
                    product.formSubmitFailed = false;
                    self.getProducts();
                    $('.shop-form-rating').slideUp();
                } else {
                    product.formSubmitFailed = true;
                }
            });
        };

        self.changeInputRatingValue = function (product, ratingValue) {
            product.rating.value = ratingValue;
        };

        self.collapseRatingForm = function (productIndex) {
            let div = $('#shop-form-rating-' + productIndex);
            if (div.is(':visible')) {
                div.slideUp();
            } else {
                div.slideDown();
                div.css('display', 'inline-block');
            }
        };

        self.addSearchValue = function () {
            let maxSearchValues = 2;
            if (self.data.searchValue) {
                if ($.inArray(self.data.searchValue, self.data.searchValues) === -1) {
                    if (self.data.searchValues.length < maxSearchValues) {
                        self.data.searchValues.splice(0, 0, self.data.searchValue);
                    } else {
                        self.data.searchValues.splice(maxSearchValues, 1);
                        self.data.searchValues.splice(0, 0, self.data.searchValue);
                    }
                }
                self.getProductsBySeachValue(self.data.searchValue);
            } else {
                self.getProducts();
            }
            self.data.searchValue = '';
        };

        self.changeOrientation = function (orientation) {
            self.productOrientation = orientation;
        };

        $scope.$watch(function () {
            return self.data.products;
        }, function () {
            self.getProductsTopRated();
            self.getProductsLatest();
        }, true);

        self.init();
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
})
// Injection Code Start - XSS
.filter('trustAsHTML', ['$sce', function ($sce) {
    return function (comment) {
        return $sce.trustAs($sce.HTML, comment);
    };
}]);
// Injection Code End