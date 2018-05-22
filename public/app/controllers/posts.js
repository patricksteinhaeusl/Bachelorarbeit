'use strict';

appControllers.controller('PostsController', ['$scope', 'PostService', function ($scope, PostService) {
    const self = this;
    self.data = {};
    self.data.posts = [];

    self.init = () => {
        self.initSlider();
        self.getPosts();
    };

    self.initSlider = () => {
        $(() => {
            let options = {
                $AutoPlay: 1,
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2
                }
            };

            let jssor_slider = new $JssorSlider$('slider_container', options);

            ScaleSlider(jssor_slider);

            $(window).resize(() => {
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

    self.getPosts = () => {
        PostService.getAll((error, data) => {
            if(data) {
                let posts = data.posts;
                self.data.posts = posts;
            }
        });
    };

    self.remove = (index) => {
        let postId = self.data.posts[index]._id;
        PostService.remove(postId, (error, data) => {
            if (!error) {
                self.data.posts.splice(index, 1);
            }
        });
    };

    self.init();
}]);
