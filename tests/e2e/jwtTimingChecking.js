'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('JWT Timing Checking', function () {

    describe('Retailer User Login', function () {

        beforeEach(function () {
            browser.get(browser.params.webshop);
        });

        it('should fail', function () {

            HelperFunctions.login(browser, 'retailer0', 'SecretRetailer12345');
            expect(element(by.className('alert')).getText()).toMatch('Warning: Username or Password incorrect')
        });
    });
});
