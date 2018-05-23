'use strict';

describe('DOM Based XSS', () => {

    describe('should change dropdown value', () => {
        it('should be successfully', () => {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=5').then(() => {
                const products = element.all(by.repeater('product in shop.products'));
                products.then((products) => {
                    for(let i = 0; i < products.length; i++) {
                        expect(products[i].element(by.model('product.selectedQuantity')).getAttribute('value')).toBe("5");
                    }
                });
            });
        });
    });

    describe('should throw alert', () => {
        it('should be successfully', () => {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=<script>console.log("DOM Based XSS");</script>').then(() => {
                browser.manage().logs().get('browser').then((browserLog) => {
                    require('util').inspect(browserLog);
                    console.log(browserLog);
                    expect(browserLog[browserLog.length-1].message).toContain('DOM Based XSS');
                });
            });
        });
    });
});
