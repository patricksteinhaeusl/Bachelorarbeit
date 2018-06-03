'use strict';

appServices.factory('ShopService', ['$http', '$routeParams', 'ResponseService', function ($http, $routeParams, ResponseService) {
    var self = this;
    self.products = {};
    self.productsTopRated = {};
    self.productsLatest = {};
    self.categories = {};
    self.searchValue = null;
    self.searchValues = [];

    self.selectedQuantity = $routeParams.selectedQuantity;

    self.getProducts = function (callback) {
        $http.get('/api/product').then(function (response) {
            var updatedResponse = self.addSelectedQuantity(response);
            ResponseService.successCallback(updatedResponse, callback);
        }, function (error) {
            return ResponseService.errorCallback(error, callback);
        });
    };

    self.getProductsCategory = function (categoryId, callback) {
        $http.get('/api/product/category/' + categoryId).then(function (response) {
            var updatedResponse = self.addSelectedQuantity(response);
            ResponseService.successCallback(updatedResponse, callback);
        }, function (error) {
            return ResponseService.errorCallback(error, callback);
        });
    };

    self.getProductsBySearchValue = function (searchValue, callback) {
        self.searchValue = searchValue;
        var data = { searchValue: searchValue };
        $http.post('/api/product/searchValue/', data).then(function (response) {
            self.addSearchValue();
            var updatedResponse = self.addSelectedQuantity(response);
            ResponseService.successCallback(updatedResponse, callback);
        }, function (error) {
            self.products = {};
            ResponseService.errorCallback(error, callback);
        });
    };

    self.getProductsTopRated = function (callback) {
        $http.get('/api/product/toprated').then(function (response) {
            return ResponseService.successCallback(response, callback);
        }, function (error) {
            return ResponseService.errorCallback(error, callback);
        });
    };

    self.getProductsLatest = function (callback) {
        $http.get('/api/product/latest').then(function (response) {
            return ResponseService.successCallback(response, callback);
        }, function (error) {
            return ResponseService.errorCallback(error, callback);
        });
    };

    self.getProductCategories = function (callback) {
        $http.get('/api/product/category').then(function (response) {
            return ResponseService.successCallback(response, callback);
        }, function (error) {
            return ResponseService.errorCallback(error, callback);
        });
    };

    self.rateProduct = function (product, rating, callback) {
        var data = { 'product': product, 'rating': rating };
        $http.post('/api/product/rating', data).then(function (response) {
            return ResponseService.successCallback(response, callback);
        }, function (error) {
            return ResponseService.errorCallback(error, callback);
        });
    };

    self.addSearchValue = function () {
        var maxSearchValues = 2;
        if (self.searchValue) {
            if ($.inArray(self.searchValue, self.searchValues) === -1) {
                if (self.searchValues.length < maxSearchValues) {
                    self.searchValues.splice(0, 0, self.searchValue);
                } else {
                    self.searchValues.splice(maxSearchValues, 1);
                    self.searchValues.splice(0, 0, self.searchValue);
                }
            }
        }
    };

    self.addSelectedQuantity = function (response) {
        var products = response.data.data.products;
        if (products) {
            products.forEach(function (product) {
                product.selectedQuantity = $routeParams.selectedQuantity;
            });
            self.products = products;
        }
        return response;
    };

    self.getSearchValue = function () {
        return self.searchValue;
    };

    return self;
}]);