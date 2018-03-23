'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Auth - NoSQL Injection', function () {
    afterEach(function () {
        HelperFunctions.logout(browser);
    });

    describe('Login normal with username and password', function () {
        it('should be successfully', function () {
            HelperFunctions.login(browser, 'customer0', 'compass0');
            //Check
            expect(element.all(by.css('.menu-item-username')).get(0).getText().length).not.toBe(0);
        });
    });

    describe('Login with username and NoSQL Injection as pw', function () {
        it('should be successfully', function () {
            HelperFunctions.login(browser, 'customer1', '{"$ne": null}');
            //Check
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Peter Holzmann');
        });
    });
});
