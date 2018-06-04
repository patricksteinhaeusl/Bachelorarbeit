'use strict';

appDirectives.directive('addOptions', ['$routeParams', function ($routeParams) {
    //Polyfill becuse IE doesnt know element.remove() method
    (arr => {
        arr.forEach(item => {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    if (this.parentNode !== null)
                        this.parentNode.removeChild(this);
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

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
