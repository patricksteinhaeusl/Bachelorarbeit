'use strict';

appControllers.controller('FaqController', ['$scope', '$routeParams', 'FaqService', function ($scope, $routeParams, FaqService) {
    var self = this;
    self.data = {};
    self.data.searchValue = null;
    self.spinner = false;

    self.init = function () {
        self.getFaq();
    };

    self.getFaq = function () {
        FaqService.getFaq(self.updateFaq);
    };

    self.getFaqBySearchValue = function () {
        self.spinner = true;
        if (self.data.searchValue) {
            FaqService.getFaqBySearchValue(self.data.searchValue, self.updateFaq);
        } else {
            self.getFaq();
        }
        self.data.searchValue = '';
    };

    self.updateFaq = function (error, data) {
        if (data) {
            self.data.FaqQuestions = data.faq;
        } else {
            self.data = {};
        }
        self.spinner = false;
    };

    self.init();
}]);