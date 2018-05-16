'use strict';
const HelperFunctions = require('./helperFunctions.js');
const urlParse = require("url");

describe('JSON Response with text/html Content-Type', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        element(by.linkText('Shop')).click();
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    let lastSegment;
    it('should return 200 and have content-type text/html', function () {
        browser.get(browser.params.webshop + '/#!/shop').then(function () {
            element.all(by.repeater('product in shop.products')).then(function (products) {
                let firstProduct = products[0];
                firstProduct.element(by.linkText('Details')).click();
                element(by.model('product.data.question.text')).clear().then(function () {
                    element(by.model('product.data.question.text')).sendKeys("<script>alert(12345);</script>");
                });
                element(by.buttonText('Save')).click();
                browser.getCurrentUrl().then(function (url) {
                    let parsedURL = urlParse.parse(url);
                    let parts = parsedURL.hash.split('/');
                    lastSegment = parts.pop() || parts.pop();
                    httpGet(browser.params.webshop + "/api/product/" + lastSegment).then(function (result) {
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

        http.get(siteUrl, function (response) {

            let bodyString = '';

            response.setEncoding('utf8');

            response.on("data", function (chunk) {
                bodyString += chunk;
            });

            response.on('end', function () {
                defer.fulfill({
                    statusCode: response.statusCode,
                    bodyString: bodyString,
                    headers: response.headers
                });
            });

        }).on('error', function (e) {
            defer.reject("Got http.get error: " + e.message);
        });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        return defer.promise;
    }

    it('should throw alert because of XSS', function () {
        browser.waitForAngularEnabled(false);
        browser.get(browser.params.webshop + "/api/product/" + lastSegment).then(function () {
            let alertDialog = browser.switchTo().alert();
            expect(alertDialog.getText()).toBe('12345');
            alertDialog.accept();
        });
        browser.waitForAngularEnabled(true);
    });
});
