'use strict';

appDirectives.directive('activeLink', ['$location', function ($location) {
    return function (scope, elem) {
        scope.$on("$routeChangeSuccess", function () {
            var hrefs = ['/#!' + $location.path(), '#!' + $location.path(), $location.path()];
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                var href = a.attr('href');
                if (href.indexOf('shop') !== -1) {
                    href = '#!/shop';
                }
                if (hrefs.indexOf(href) !== -1) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');
                }
            });
        });
    };
}]);