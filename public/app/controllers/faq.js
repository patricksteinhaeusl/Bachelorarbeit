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
            FaqService.getFaq(function (error, data) {
                if (data) {
                    self.data.FaqQuestions = data.faq;
                }
            });
        };

        self.getFaqBySearchValue = function () {
            if (self.data.searchValue) {
                FaqService.getFaqBySearchValue(self.data.searchValue, function (error, data) {
                    if (data) {
                        self.data.FaqQuestions = data.faq;
                    }
                });
            } else {
                self.getFaq();
            }
            self.data.searchValue = '';
        };
        self.init();
    }]);
