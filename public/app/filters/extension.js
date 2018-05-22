appFilters.filter('extension', function () {
    return (input) => {
        return input.split('.').pop();
    };
});
