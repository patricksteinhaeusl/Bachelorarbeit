'use strict';

describe('Search and Filter', () => {
    function checkSortedArray(unSorted) {
        let sorted = unSorted.slice();
        sorted.sort();
        return expect(sorted).toEqual(unSorted);
    }

    describe('Search for products', () => {
        it('should return correct amount of products', () => {
            browser.get(browser.params.webshop).then(() => {
                element(by.linkText('Shop')).click();
                //Fill out Input
                element(by.model('productSearch.searchValue')).sendKeys('treich').sendKeys(protractor.Key.ENTER);
                browser.sleep(250);
                expect(element.all(by.repeater('product in shop.products')).count()).toBe(5);
            });
        });

        it('should store latest search in history', () => {
            expect(element.all(by.repeater('searchValue in productSearch.searchValues'))
                .get(0).element(by.linkText('treich')).getText()).toBe('treich');
        });
    });

    describe('Filter by Categories', () => {
        it('should return correct amount of Schelbert', () => {
            element(by.linkText('Schelbert')).click();
            expect(element.all(by.repeater('product in shop.products')).count()).toBe(3);
        });

        it('should return correct amount of Steiner, Wynigen', () => {
            element(by.linkText('Steiner, Wynigen')).click();
            expect(element.all(by.repeater('product in shop.products')).count()).toBe(2);
        });

        it('should return correct amount of Zurfluh', () => {
            element(by.linkText('Zurfluh')).click();
            expect(element.all(by.repeater('product in shop.products')).count()).toBe(2);
        });
    });

    describe('Sort by', () => {
        it('name should return correct order', () => {
            element(by.model('shop.selectedSort')).sendKeys('name');
            let unSorted = [];
            element.all(by.repeater('product in shop.products')).each((element, index) => {
                element.element(by.className('product-name')).getText().then((element) => {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('size should return correct order', () => {
            element(by.model('shop.selectedSort')).sendKeys('size');
            let unSorted = [];
            element.all(by.repeater('product in shop.products')).each((element, index) => {
                element.element(by.className('product-value')).getText().then((element) => {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('price should return correct order', () => {
            element(by.model('shop.selectedSort')).sendKeys('price');
            let unSorted = [];
            element.all(by.repeater('product in shop.products')).each((element, index) => {
                element.element(by.className('product-price')).getText().then((element) => {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('category should return correct order', () => {
            element(by.model('shop.selectedSort')).sendKeys('category');
            let unSorted = [];
            element.all(by.repeater('product in shop.products')).each((element, index) => {
                element.element(by.className('product-category')).getText().then((element) => {
                    unSorted[index] = element;
                });
            }).then(checkSortedArray(unSorted));
        });

        it('rating should return correct order', () => {
            element(by.model('shop.selectedSort')).sendKeys('rating');
            let sorted = [], unSorted = [];
            element.all(by.repeater('product in shop.products')).each((element, index) => {
                element.element(by.className('rating-average')).getText().then((element) => {
                    unSorted[index] = element;
                });
            }).then(() => {
                sorted = unSorted.slice();
                sorted.sort((a, b) => {
                    return b - a
                });
                expect(sorted).toEqual(unSorted);
            });
        });
    });
});
