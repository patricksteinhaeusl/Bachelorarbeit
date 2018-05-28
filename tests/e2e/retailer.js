'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Retailer', function () {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('button should say that function is disabled', () => {
        //Link
        element(by.linkText('Retailer Area')).click();
        browser.sleep(250);
        element(by.buttonText('Send request')).click();
        browser.sleep(250);
        expect(element.all(by.className('alert-info')).last().getText()).toBe("Warning: This function is disabled.\n×");

    });

});
