'use strict';

appServices.factory('ShopService', ['$http', '$routeParams', 'ResponseService', function ($http, $routeParams, ResponseService) {
    let self = this;
    self.products = {};
    self.productsTopRated = {};
    self.productsLatest = {};
    self.categories = {};
    self.searchValue = null;
    self.searchValues = [];

    self.selectedQuantity = $routeParams.selectedQuantity;

    self.getProducts = (callback) => {
        $http
            .get('/api/product')
            .then(
                (response) => {
                    let updatedResponse = self.addSelectedQuantity(response);
                    ResponseService.successCallback(updatedResponse, callback);
                }, (error) => ResponseService.errorCallback(error, callback)
            );
    };

    self.getProductsCategory = (categoryId, callback) => {
        $http
            .get('/api/product/category/' + categoryId)
            .then(
                (response) => {
                    let updatedResponse = self.addSelectedQuantity(response);
                    ResponseService.successCallback(updatedResponse, callback);
                }, (error) => ResponseService.errorCallback(error, callback)
            );
    };

    self.getProductsBySearchValue = (searchValue, callback) => {
        self.searchValue = searchValue;
        let data = {searchValue: searchValue};
        $http
            .post('/api/product/searchValue/', data)
            .then(
                (response) => {
                    self.addSearchValue();
                    let updatedResponse = self.addSelectedQuantity(response);
                    ResponseService.successCallback(updatedResponse, callback);
                }, (error) => {
                    self.products = {};
                    ResponseService.errorCallback(error, callback)
                });
    };

    self.getProductsTopRated = (callback) => {
        $http
            .get('/api/product/toprated')
            .then(
                (response) => ResponseService.successCallback(response, callback),
                (error) => ResponseService.errorCallback(error, callback)
            );
    };

    self.getProductsLatest = (callback) => {
        $http
            .get('/api/product/latest')
            .then(
                (response) => ResponseService.successCallback(response, callback),
                (error) => ResponseService.errorCallback(error, callback)
            );
    };

    self.getProductCategories = (callback) => {
        $http
            .get('/api/product/category')
            .then(
                (response) => ResponseService.successCallback(response, callback),
                (error) => ResponseService.errorCallback(error, callback)
            );
    };

    self.rateProduct = (product, rating, callback) => {
        let data = {'product': product, 'rating': rating};
        $http
            .post('/api/product/rating', data)
            .then(
                (response) => ResponseService.successCallback(response, callback),
                (error) => ResponseService.errorCallback(error, callback)
            );
    };

    self.addSearchValue = () => {
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
        }
    };

    self.addSelectedQuantity = (response) => {
        let products = response.data.data.products;
        if (products) {
            products.forEach((product) => {
                product.selectedQuantity = $routeParams.selectedQuantity;
            });
            self.products = products;
        }
        return response;
    };

    self.getSearchValue = () => {
        return self.searchValue;
    };

    return self;
}]);
