'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('XSS in Comments', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    it('comment should be successfully added', function () {
        //Add a Comment
        element(by.linkText('Shop')).click();
        //Get first product
        element.all(by.repeater('product in shop.products')).then(function (products) {
            let thirdProduct = products[3];
            //Open Comment
            thirdProduct.element(by.buttonText('Rate')).click();
            browser.sleep(250);
            thirdProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
            //Fill form
            let commentField = thirdProduct.element(by.model('rating.comment'));
            commentField.clear().then(function () {
                commentField.sendKeys("<script>console.log(\"XSS in Comments\");</script>");
                //Submit form
                thirdProduct.element(by.buttonText('Save')).click();
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Rating saved successfully.\n×");
            });
        });
    });

    it('should be successfully executed', function () {
        browser.manage().logs().get('browser').then(function(browserLog) {
            require('util').inspect(browserLog);
            expect(browserLog[browserLog.length-1].message).toContain('XSS in Comments');
        });
    });
});
