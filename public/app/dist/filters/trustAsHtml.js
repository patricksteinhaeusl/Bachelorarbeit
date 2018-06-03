'use strict';

appFilters.filter('trustAsHTML', ['$sce', function ($sce) {
    return function (html) {
        return $sce.trustAs($sce.HTML, html);
    };
}]);