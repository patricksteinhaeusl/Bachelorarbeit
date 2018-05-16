'use strict';

describe('DOM Based XSS', function () {

    describe('should change dropdown value', function () {
        it('should be successfully', function () {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=5').then(function () {
                const products = element.all(by.repeater('product in shop.products'));
                products.then(function(products) {
                    for(let i = 0; i < products.length; i++) {
                        expect(products[i].element(by.model('product.selectedQuantity')).getAttribute('value')).toBe("5");
                    }
                });
            });
        });
    });

    describe('should throw alert', function () {
        it('should be successfully', function () {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=<script>console.log("DOM Based XSS");</script>').then(function () {
                browser.manage().logs().get('browser').then(function(browserLog) {
                    require('util').inspect(browserLog);
                    expect(browserLog[browserLog.length-1].message).toContain('DOM Based XSS');
                });
            });
        });
    });
});
