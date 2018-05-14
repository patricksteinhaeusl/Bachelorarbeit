'use strict';

appControllers.controller('FaqController', ['$rootScope', '$scope', '$routeParams', 'FaqService',
    function ($rootScope, $scope, $routeParams, faqService) {
        const self = this;
        self.data = {};
        self.data.searchValue = null;

        self.init = function () {
            self.getFaq();
        };

        self.getFaq = function () {
            $rootScope.messages = {};
            faqService.getFaq(function (error, data, message, validations) {
                if (error) $rootScope.messages.error = error;
                if (validations) $rootScope.messages.validations = validations;
                if (!data) $rootScope.messages.warning = message;
                if (data) {
                    self.data.FaqQuestions = data;
                    $rootScope.messages.success = message;
                }
            });
        };

        self.getFaqBySearchValue = function () {
            if (self.data.searchValue) {
                faqService.getFaqBySearchValue(self.data.searchValue, function (error, data, message, validations) {
                    if (error) $rootScope.messages.error = error;
                    if (validations) $rootScope.messages.validations = validations;
                    if (!data) $rootScope.messages.warning = message;
                    if (data) {
                        self.data.FaqQuestions = data;
                        $rootScope.messages.success = message;
                    }
                });
            } else {
                self.getFaq();
            }
            self.data.searchValue = '';
        };
        self.init();
    }]);
