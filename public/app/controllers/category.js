'use strict';

appControllers.controller('CategoryController', ['$rootScope', '$scope', '$routeParams', 'ShopService',
    function ($rootScope, $scope, $routeParams, ShopService) {
        const self = this;
        self.data = {};
        self.data.categories = {};
        self.data.categoryId = $routeParams.categoryId;

        ShopService.getProductCategories(function(categories) {
            self.data.categories = categories;
        });

        $scope.$watch(function() {
            return $routeParams.categoryId;
        }, function(categoryId) {
            self.data.categoryId = categoryId;
        }, true);
    }]);
