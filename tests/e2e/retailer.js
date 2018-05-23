'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Retailer', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    it('button should say that function is disabled', function () {
        //Link
        element(by.linkText('Retailer Area')).click();
        browser.sleep(250);
        element(by.buttonText('Send request')).click();
        browser.sleep(250);
        expect(element.all(by.className('alert')).get(0).getText()).toBe("Warning: This function is disabled.\n×");

    });

});
