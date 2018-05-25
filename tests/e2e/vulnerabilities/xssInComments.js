'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('XSS in Comments', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('comment should be successfully added', () => {
        //Add a Comment
        element(by.linkText('Shop')).click();
        //Get first product
        element.all(by.repeater('product in shop.products')).then((products) => {
            let thirdProduct = products[3];
            //Open Comment
            thirdProduct.element(by.buttonText('Rate')).click();
            browser.sleep(250);
            thirdProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
            //Fill form
            let commentField = thirdProduct.element(by.model('rating.comment'));
            commentField.clear().then(() => {
                commentField.sendKeys("<script>console.log(\"XSS in Comments\");</script>");
                //Submit form
                thirdProduct.element(by.buttonText('Save')).click();
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Rating saved successfully.\n×");
            });
            //Check if Comment in Comment Field
            thirdProduct.element(by.buttonText('Rate')).click();
            expect(thirdProduct.element(by.name('comment')).getAttribute('value')).toEqual("<script>console.log(\"XSS in Comments\");</script>");

        });
    });

    it('should be successfully executed', () => {
        HelperFunctions.searchBrowserConsole('XSS in Comments', (found) => {
            expect(found).toBe(true);
        });
    });
});
