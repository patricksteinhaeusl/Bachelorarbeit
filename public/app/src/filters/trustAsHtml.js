'use strict';

appFilters.filter('trustAsHTML', ['$sce', function ($sce) {
    return (html) => {
        return $sce.trustAs($sce.HTML, html);
    };
}]);
