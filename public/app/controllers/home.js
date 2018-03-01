'use strict';

appControllers.controller('HomeController', ['$scope', 'PostService', function($scope, postService) {
  const self = this;
  self.data = {};
  self.data.posts = [];

  self.init = function() {
    self.initSlider();
    self.getPosts();
  };

  self.initSlider = function() {
    $(document).ready(function() {
      let options = {
        $AutoPlay: 1,
        $BulletNavigatorOptions: {
          $Class: $JssorBulletNavigator$,
          $ChanceToShow: 2
        }
      };

      let jssor_slider = new $JssorSlider$('slider_container', options);

      ScaleSlider(jssor_slider);

      $(window).resize(function() {
        ScaleSlider(jssor_slider);
      });
    });
  };

  function ScaleSlider(jssor_slider) {
    let parentWidth = $('#slider_container').parent().width();
    if (parentWidth) {
      jssor_slider.$ScaleWidth(parentWidth);
    } else {
      window.setTimeout(ScaleSlider, 30);
    }
  }

  self.getPosts = function() {
    postService.getAll(function(data) {
      self.data.posts = data;
    });
  };

  self.init();
}])
// Injection Code Start - SVG Injection
.filter('trustAsResourceUrl', ['$sce', function ($sce) {
  return function(postImage) {
    let serverUrl = 'http://localhost:3000/post-images/';
    return $sce.trustAs($sce.RESOURCE_URL, serverUrl + postImage);
  };
}])
// Injection Code End
.filter('extension', function() {
  return function(input) {
    return input.split('.').pop();
  };
});
