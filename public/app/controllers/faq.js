'use strict';

appControllers.controller('FaqController', ['$scope', '$routeParams', 'FaqService',
    function ($scope, $routeParams, FaqService) {
        const self = this;
        self.data = {};
        self.data.searchValue = null;

        self.init = function () {
            self.getFaq();
        };

        self.getFaq = function () {
            FaqService.getFaq(self.updateFaq);
        };

        self.getFaqBySearchValue = function () {
            if (self.data.searchValue) {
                FaqService.getFaqBySearchValue(self.data.searchValue, self.updateFaq);
            } else {
                self.getFaq();
            }
            self.data.searchValue = '';
        };

        self.updateFaq = (error, data) => {
            if (data) {
                self.data.FaqQuestions = data.faq;
            }
        };

        self.init();
    }]);
