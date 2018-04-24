'use strict';

appServices.factory('ShopService', ['$http', '$q', function ($http, $q) {
    return {
        getProducts: function (callback) {
            $http
                .get('/api/product')
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsByCategory: function (categoryId, callback) {
            $http
                .get('/api/product/category/' + categoryId)
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsTopRated: function (callback) {
            $http
                .get('/api/product/toprated')
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsLatest: function (callback) {
            $http
                .get('/api/product/latest')
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsBySearchValue: function (searchValue, callback) {
            let data = {searchValue: searchValue};
            $http
                .post('/api/product/searchValue/', data)
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductCategories: function (callback) {
            $http
                .get('/api/product/category')
                .then(function (response) {
                    let categories = response.data.data.categories;
                    return callback(categories);
                }, function (response) {
                    return callback(false);
                });
        },
        rateProduct: function (product, rating, callback) {
            let data = {'product': product, 'rating': rating};
            $http
                .post('/api/product/rating', data)
                .then(function (response) {
                    let statusCode = response.data.statusCode;
                    let message = response.data.message;
                    let validations = response.data.validations;
                    if (statusCode === 200) {
                        return callback(null, null, message, null);
                    } else if (statusCode === 405) {
                        return callback(null, null, null, validations);
                    }
                    return callback(null, null, message, null);
                }, function (error) {
                    return callback(error);
                });
        }
    };
}]);
