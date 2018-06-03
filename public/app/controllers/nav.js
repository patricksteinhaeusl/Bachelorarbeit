'use strict';

appControllers.controller('NavController', function ($scope) {
    const self = this;

    self.collapseNavigation = (elementClassToSlide, elementClassToFooter) => {
       $(() => {
            $(elementClassToFooter).css('display', 'none');
            if ($(elementClassToSlide).is(':visible')) {
                $scope.$slider = $(elementClassToSlide).slideUp();
            } else {
                $scope.$slider = $(elementClassToSlide).slideDown();
            }
        });
    };

    self.collapseCartNavigation = (elementClassToSlide, elementClassToFooter) => {
        $(() => {
            $(elementClassToFooter).css('display', 'none');
            if (!$(elementClassToSlide).is(':visible')) {
                $scope.$slider = $(elementClassToSlide).slideDown();
            }
        });
    };
});
