'use strict';

appControllers.controller('FaqController', ['FaqService',
    function (faqService) {
        const self = this;
        self.data = {};

        self.init = function () {
            self.getFaq();
        };

        self.getFaq = function () {
            faqService.getFaq(function (faqQuestions) {
                self.data.FaqQuestions = faqQuestions;
            });
        };

        self.getFaqBySearchValue = function () {
            faqService.getFaq(function (faqQuestions) {
                self.data.FaqQuestions = faqQuestions;
            });
        };
        self.init();
    }]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});
