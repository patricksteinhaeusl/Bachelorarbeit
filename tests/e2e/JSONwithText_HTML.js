'use strict';
const urlParse = require("url");

describe('Product Details', function () {

    describe('JSON Response with text/html Content-Type', function () {
        it('should return 200 and have content-type text/html', function () {
            browser.get(browser.params.webshop + '/#!/shop').then(function () {
                element.all(by.repeater('product in shop.data.products')).then(function (products) {
                    let firstProduct = products[0];
                    firstProduct.element(by.linkText('Details')).click();
                    element(by.model('product.data.question.text')).clear().then(function () {
                        element(by.model('product.data.question.text')).sendKeys("<script>alert(12345);</script>");
                    });
                    element(by.buttonText('Save')).click();
                    let currentURLbrowser.getCurrentUrl().then( function( url ) {
                        console.log(url);
                    });
                    //console.log(currentURL);
                   // let parsedURL = urlParse.parse(currentURL);
                    //console.log(parsedURL);
                    //let parts = parsedURL.hash.split('/');
                    //let lastSegment = parts.pop() || parts.pop();
                    browser.sleep(5000);
                });
                httpGet(browser.params.webshop + "/api/product/5aa0481e876d9d39d4397885").then(function (result) {
                    expect(result.statusCode).toBe(200);
                    expect(JSON.stringify(result.headers)).toContain("text/html");
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
            browser.get(browser.params.webshop + "/api/product/5aa0481e876d9d39d4397885").then(function () {
                browser.sleep(50000);
                let alertDialog = browser.switchTo().alert();
                expect(alertDialog.getText()).toBe(12345);
                alertDialog.accept();
            });
            browser.waitForAngularEnabled(true);
        });
    });
});
