'use strict';

appControllers.controller('CategoryController', ['$scope', '$routeParams', 'ShopService', function ($scope, $routeParams, ShopService) {
    const self = this;
    self.data = {};
    self.data.categories = {};
    self.data.categoryId = $routeParams.categoryId;

    ShopService.getProductCategories((error, data) => {
        if(data) {
            let categories = data.categories;
            self.data.categories = categories;
        }
    });

    $scope.$watch(() => {
        return $routeParams.categoryId;
    }, (categoryId) => {
        self.data.categoryId = categoryId;
    }, true);
}]);
