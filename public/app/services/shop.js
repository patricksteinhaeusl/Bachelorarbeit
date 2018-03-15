'use strict';

appServices.factory('ShopService', ['$http', '$q', function ($http, $q) {
    return {
        getProducts: function (callback) {
            $http
                .get('http://localhost:3000/api/product')
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsByCategory: function (categoryId, callback) {
            $http
                .get('http://localhost:3000/api/product/category/' + categoryId)
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsTopRated: function (callback) {
            $http
                .get('http://localhost:3000/api/product/toprated')
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsLatest: function (callback) {
            $http
                .get('http://localhost:3000/api/product/latest')
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductsBySearchValue: function (searchValue, callback) {
            let escapedSearchValue = searchValue.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\\/]/g, '');
            $http
                .get('http://localhost:3000/api/product/searchValue/' + escapedSearchValue)
                .then(function (response) {
                    let products = response.data.data.products;
                    return callback(products);
                }, function (response) {
                    return callback(false);
                });
        },
        getProductCategories: function (callback) {
            $http
                .get('http://localhost:3000/api/product/category')
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
                .post('http://localhost:3000/api/product/rating', data)
                .then(function (response) {
                    return callback(true);
                }, function (response) {
                    return callback(false);
                });
        }
    };
}]);
