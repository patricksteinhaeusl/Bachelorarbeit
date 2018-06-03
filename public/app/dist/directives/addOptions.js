'use strict';

appDirectives.directive('addOptions', ['$routeParams', function ($routeParams) {
    return function (scope, element, attrs) {
        scope.$watch(function () {
            return $routeParams.selectedQuantity;
        }, function (selectedQuantity) {
            var options = element.find('option');
            angular.forEach(options, function (element) {
                if (element.value === selectedQuantity) {
                    element.remove();
                }
            });
            element.prepend('<option value=' + selectedQuantity + ' selected>' + selectedQuantity + '</option>');
        }, false);
    };
}]);