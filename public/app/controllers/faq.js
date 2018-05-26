'use strict';

appControllers.controller('FaqController', ['$scope', '$routeParams', 'FaqService', function ($scope, $routeParams, FaqService) {
    const self = this;
    self.data = {};
    self.data.searchValue = null;
    self.spinner = false;

    self.init = () => {
        self.getFaq();
    };

    self.getFaq = () => {
        FaqService.getFaq(self.updateFaq);
    };

    self.getFaqBySearchValue = () => {
        self.spinner = true;
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
        self.spinner = false;
    };

    self.init();
}]);
