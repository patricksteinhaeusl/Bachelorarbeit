'use strict';

appControllers.controller('PostsController', ['$scope', 'PostService', function ($scope, PostService) {
    var self = this;
    self.data = {};
    self.data.posts = [];

    self.init = function () {
        self.initSlider();
        self.getPosts();
    };

    self.initSlider = function () {
        $(function () {
            var options = {
                $AutoPlay: 1,
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2
                }
            };

            var jssor_slider = new $JssorSlider$('slider_container', options);

            ScaleSlider(jssor_slider);

            $(window).resize(function () {
                ScaleSlider(jssor_slider);
            });
        });
    };

    function ScaleSlider(jssor_slider) {
        var parentWidth = $('#slider_container').parent().width();
        if (parentWidth) {
            jssor_slider.$ScaleWidth(parentWidth);
        } else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    self.getPosts = function () {
        PostService.getAll(function (error, data) {
            if (data) {
                var posts = data.posts;
                self.data.posts = posts;
            }
        });
    };

    self.remove = function (index) {
        var postId = self.data.posts[index]._id;
        PostService.remove(postId, function (error, data) {
            if (!error) {
                self.data.posts.splice(index, 1);
            }
        });
    };

    self.init();
}]);