'use strict';
const HelperFunctions = require('../helperFunctions.js');
const urlParse = require("url");

describe('JSON Response with text/html Content-Type', () => {
    let result;
    let lastSegment;
    let productName;
    beforeAll((done) => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        browser.get(browser.params.webshop + '/#!/shop').then(() => {
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                firstProduct.element(by.linkText('Details')).click();
                productName = element(by.binding('product.name')).getText();
                element(by.model('product.data.question.text')).clear().then(() => {
                    element(by.model('product.data.question.text')).sendKeys("<script>console.log('JSON with Text/Html');</script>");
                });
                element(by.buttonText('Save')).click();
                browser.getCurrentUrl().then((url) => {
                    let parsedURL = urlParse.parse("https://localhost/api/product/5aa0481e876d9d39d4397885/");
                    lastSegment = parsedURL.path.split('/').filter((el) => { return !!el; }).pop();
                    result = HelperFunctions.httpRequest(browser.params.webshop + "/api/product/" + lastSegment).then((result) => {
                        done();
                        return result;
                    });
                });
            });
        });
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('should return 200', () => {
        result.then((text) => {
            expect(text.statusCode).toBe(200);
        });
    });

    it('should be correct website', () => {
        result.then((text) => {
            expect(text.bodyString).toContain(productName);
        });
    });

    it('should have content-type text/html', () => {
        result.then((text) => {
            expect(JSON.stringify(text.headers)).toContain("text/html");
        });
    });


    it('should throw alert because of XSS', () => {
        browser.waitForAngularEnabled(false);
        browser.get(browser.params.webshop + "/api/product/" + lastSegment).then(() => {
            HelperFunctions.searchBrowserConsole('JSON with Text/Html', (found) => {
                expect(found).toBe(true);
            });
        });
        browser.waitForAngularEnabled(true);
    });
});
