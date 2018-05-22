appDirectives.directive('addOptions', ['$routeParams', function ($routeParams) {
    return (scope, element, attrs) => {
        scope.$watch(() => {
            return $routeParams.selectedQuantity;
        }, (selectedQuantity) => {
            let options = element.find('option');
            angular.forEach(options, (element) => {
                if (element.value === selectedQuantity) {
                    element.remove();
                }
            });
            element.prepend('<option value=' + selectedQuantity + ' selected>' + selectedQuantity + '</option>');
        }, false);
    };
}]);
