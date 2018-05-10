'use strict';

appControllers.controller('CategoryController', ['$rootScope', '$scope', '$location', 'ShopService',
    function ($rootScope, $scope, $location, ShopService) {
        const self = this;
        self.data = {};
        self.data.categories = {};

        ShopService.getProductCategories(function(categories) {
            self.data.categories = categories;
        });
    }]);
