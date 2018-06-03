'use strict';

appControllers.controller('NavController', function ($scope) {
    var self = this;

    self.collapseNavigation = function (elementClassToSlide, elementClassToFooter) {
        $(function () {
            $(elementClassToFooter).css('display', 'none');
            if ($(elementClassToSlide).is(':visible')) {
                $scope.$slider = $(elementClassToSlide).slideUp();
            } else {
                $scope.$slider = $(elementClassToSlide).slideDown();
            }
        });
    };

    self.collapseCartNavigation = function (elementClassToSlide, elementClassToFooter) {
        $(function () {
            $(elementClassToFooter).css('display', 'none');
            if (!$(elementClassToSlide).is(':visible')) {
                $scope.$slider = $(elementClassToSlide).slideDown();
            }
        });
    };
});