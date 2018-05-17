appFilters.filter('extension', function () {
    return function (input) {
        return input.split('.').pop();
    };
});
