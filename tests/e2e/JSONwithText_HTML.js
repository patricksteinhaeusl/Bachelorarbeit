'use strict';
const HelperFunctions = require('./helperFunctions.js');
const urlParse = require("url");

describe('JSON Response with text/html Content-Type', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        element(by.linkText('Shop')).click();
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    let lastSegment;
    it('should return 200 and have content-type text/html', () => {
        browser.get(browser.params.webshop + '/#!/shop').then(() => {
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                firstProduct.element(by.linkText('Details')).click();
                element(by.model('product.data.question.text')).clear().then(() => {
                    element(by.model('product.data.question.text')).sendKeys("<script>console.log('JSON with Text/Html');</script>");
                });
                element(by.buttonText('Save')).click();
                browser.getCurrentUrl().then((url) => {
                    let parsedURL = urlParse.parse(url);
                    let parts = parsedURL.hash.split('/');
                    lastSegment = parts.pop();
                    httpGet(browser.params.webshop + "/api/product/" + lastSegment).then((result) => {
                        expect(result.statusCode).toBe(200);
                        expect(JSON.stringify(result.headers)).toContain("text/html");
                    });
                });

            });
        });
    });

    function httpGet(siteUrl) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        let http = require('https');
        let defer = protractor.promise.defer();

        http.get(siteUrl, (response) => {

            let bodyString = '';

            response.setEncoding('utf8');

            response.on("data", (chunk) => {
                bodyString += chunk;
            });

            response.on('end', () => {
                defer.fulfill({
                    statusCode: response.statusCode,
                    bodyString: bodyString,
                    headers: response.headers
                });
            });

        }).on('error', (e) => {
            defer.reject("Got http.get error: " + e.message);
        });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        return defer.promise;
    }

    it('should throw alert because of XSS', () => {
        browser.waitForAngularEnabled(false);
        browser.get(browser.params.webshop + "/api/product/" + lastSegment).then(() => {
            browser.manage().logs().get('browser').then((browserLog) => {
                require('util').inspect(browserLog);
                expect(browserLog[browserLog.length-1].message).toContain('JSON with Text/Html');
            });
        });
        browser.waitForAngularEnabled(true);
    });
});
