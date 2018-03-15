'use strict';

appControllers.controller('HomeController', ['$rootScope', '$scope', 'PostService', function ($rootScope, $scope, PostService) {
    const self = this;
    self.data = {};
    self.data.posts = [];

    self.init = function () {
        self.initSlider();
        self.getPosts();
    };

    self.initSlider = function () {
        $(document).ready(function () {
            let options = {
                $AutoPlay: 1,
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2
                }
            };

            let jssor_slider = new $JssorSlider$('slider_container', options);

            ScaleSlider(jssor_slider);

            $(window).resize(function () {
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

    self.getPosts = function () {
        PostService.getAll(function (data) {
            self.data.posts = data;
        });
    };

    self.remove = function (index) {
        let postId = self.data.posts[index]._id;
        $rootScope.messages = {};
        PostService.remove(postId, function (error, data, message) {
            if (error) $rootScope.messages.error = error;
            $rootScope.messages.success = message;
            self.data.posts.splice(index, 1);
        });
    };

    self.init();
}])
.filter('extension', function () {
    return function (input) {
        return input.split('.').pop();
    };
});
