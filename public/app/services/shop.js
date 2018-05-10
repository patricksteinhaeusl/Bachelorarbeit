'use strict';

appServices.factory('ShopService', ['$http', function ($http) {
    let self = this;
    self.products = {};
    self.productsCategory = {};
    self.productsTopRated = {};
    self.productsLatest = {};
    self.productsSearchValue = {};
    self.categories = {};
    self.searchValue = null;
    self.searchValues = [];

    self.getProducts = function (callback) {
        $http
            .get('/api/product')
            .then(function (response) {
                self.products = response.data.data.products;
                return callback(self.products);
            });
    };

    self.getProductsByCategory = function (categoryId, callback) {
        $http
            .get('/api/product/category/' + categoryId)
            .then(function (response) {
                self.productsCategory = response.data.data.products;
                return callback(self.productsCategory);
            });
    };

    self.getProductsTopRated = function (callback) {
        $http
            .get('/api/product/toprated')
            .then(function (response) {
                self.productsTopRated = response.data.data.products;
                return callback(self.productsTopRated);
            });
    };

    self.getProductsLatest = function (callback) {
        $http
            .get('/api/product/latest')
            .then(function (response) {
                self.productsLatest = response.data.data.products;
                return callback(self.productsLatest);
            });
    };

    self.getProductsBySearchValue = function (searchValue, callback) {
        self.searchValue = searchValue;
        let data = {searchValue: searchValue};
        $http
            .post('/api/product/searchValue/', data)
            .then(function (response) {
                self.productsSearchValue = response.data.data.products;
                self.addSearchValue();
                return callback(self.products);
            });
    };

    self.getProductCategories = function (callback) {
        $http
            .get('/api/product/category')
            .then(function (response) {
                self.categories = response.data.data.categories;
                return callback(self.categories);
            });
    };

    self.rateProduct = function (product, rating, callback) {
        let data = {'product': product, 'rating': rating};
        $http
            .post('/api/product/rating', data)
            .then(function (response) {
                let statusCode = response.data.statusCode;
                let message = response.data.message;
                let validations = response.data.validations;
                if (statusCode === 200) {
                    self.getProducts(function(products) {
                        self.products = products;
                        return callback(null, data, message, null);
                    });
                } else if (statusCode === 405) {
                    return callback(null, null, null, validations);
                }
                return callback(null, null, message, null);
            }, function (error) {
                return callback(error);
            });
    };

    self.addSearchValue = function () {
        let maxSearchValues = 2;
        if (self.searchValue) {
            if ($.inArray(self.searchValue, self.searchValues) === -1) {
                if (self.searchValues.length < maxSearchValues) {
                    self.searchValues.splice(0, 0, self.searchValue);
                } else {
                    self.searchValues.splice(maxSearchValues, 1);
                    self.searchValues.splice(0, 0, self.searchValue);
                }
            }
        } else {
            self.getProducts(function(products) {
                self.productsSearchValue = products;
            });
        }
        self.searchValue = null;
    };

    return self;
}]);
