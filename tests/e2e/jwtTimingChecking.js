'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('JWT Timing Checking', () => {

    describe('Retailer User Login', () => {

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        it('should fail', () => {

            HelperFunctions.login(browser, 'retailer0', 'SecretRetailer12345');
            expect(element.all(by.className('alert-info')).last().getText()).toMatch('Warning: Username or Password incorrect')
        });
    });
});
