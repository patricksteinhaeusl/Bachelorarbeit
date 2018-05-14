'use strict';

describe('Search and Filter', function () {
    function checkSortedArray(unSorted) {
        let sorted = unSorted.slice();
        sorted.sort();
        return expect(sorted).toEqual(unSorted);
    }

    describe('Search for products', function () {
        it('should return correct amount of products', function () {
            browser.get(browser.params.webshop).then(function () {
                //Fill out Input
                element(by.model('shop.data.searchValue')).sendKeys('treich').sendKeys(protractor.Key.ENTER);
                expect(element.all(by.repeater('product in shop.data.products')).count()).toBe(5);
            });
        });

        it('should store latest search in history', function () {
            expect(element.all(by.repeater('searchValue in shop.data.searchValues'))
                .get(0).element(by.linkText('treich')).getText()).toBe('treich');
        });
    });

    describe('Filter by Categories', function () {
        it('should return correct amount of Schelbert', function () {
            element(by.linkText('Schelbert')).click();
            expect(element.all(by.repeater('product in shop.data.products')).count()).toBe(3);
        });

        it('should return correct amount of Steiner, Wynigen', function () {
            element(by.linkText('Steiner, Wynigen')).click();
            expect(element.all(by.repeater('product in shop.data.products')).count()).toBe(2);
        });

        it('should return correct amount of Zurfluh', function () {
            element(by.linkText('Zurfluh')).click();
            expect(element.all(by.repeater('product in shop.data.products')).count()).toBe(2);
        });
    });

    describe('Sort by', function () {
        it('name should return correct order', function () {
            element(by.model('shop.data.sortSelected')).sendKeys('name');
            let unSorted = [];
            element.all(by.repeater('product in shop.data.products')).each(function (element, index) {
                element.element(by.className('product-name')).getText().then(function (element) {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('size should return correct order', function () {
            element(by.model('shop.data.sortSelected')).sendKeys('size');
            let unSorted = [];
            element.all(by.repeater('product in shop.data.products')).each(function (element, index) {
                element.element(by.className('product-value')).getText().then(function (element) {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('price should return correct order', function () {
            element(by.model('shop.data.sortSelected')).sendKeys('price');
            let unSorted = [];
            element.all(by.repeater('product in shop.data.products')).each(function (element, index) {
                element.element(by.className('product-price')).getText().then(function (element) {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('category should return correct order', function () {
            element(by.model('shop.data.sortSelected')).sendKeys('category');
            let unSorted = [];
            element.all(by.repeater('product in shop.data.products')).each(function (element, index) {
                element.element(by.className('product-category')).getText().then(function (element) {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('rating should return correct order', function () {
            element(by.model('shop.data.sortSelected')).sendKeys('rating');
            let sorted = [], unSorted = [];
            element.all(by.repeater('product in shop.data.products')).each(function (element, index) {
                element.element(by.className('rating-average')).getText().then(function (element) {
                    unSorted[index] = element;
                });
            }).then(function () {
                sorted = unSorted.slice();
                sorted.sort(function (a, b) {
                    return b - a
                });
                expect(sorted).toEqual(unSorted);
            });
        });
    });
});
