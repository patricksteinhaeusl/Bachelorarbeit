'use strict';

appControllers.controller('NavController', function($scope) {
  const self = this;

  self.collapseNavigation = function(elementClassToSlide, elementClassToFooter) {
    $(function() {
      $(elementClassToFooter).css('display', 'none');
      if($(elementClassToSlide).is(':visible')) {
        $scope.$slider = $(elementClassToSlide).slideUp();
      } else {
        $scope.$slider = $(elementClassToSlide).slideDown();
      }
    });
  };
});
