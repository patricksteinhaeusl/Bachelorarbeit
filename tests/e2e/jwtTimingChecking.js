'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('JWT Timing Checking', function () {

    describe('Retailer User Login', function () {

        beforeEach(function () {
            browser.get('https://localhost:3443');
        });

        it('should fail', function () {

            HelperFunctions.login(browser, 'retailer0', 'SecretRetailer12345');
            expect(element(by.css('.alert.alert-warning.alert-dismissible')).getText()).toMatch('Warning: Username or Password incorrect')
        });
    });
});
