'use strict';
const HelperFunctions = require('./helperFunctions.js')

describe('Auth - NoSQL Injection', function() {
    afterEach(function() {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.logout();
        });
    });

    describe('Login normal with username and password', function() {
        it('should be successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                HelperFunctions.login();
                //Check
                expect(element.all(by.css('.menu-item-username')).get(0).getText().length).not.toBe(0);
            });
        });
    });

    describe('Login with username and NoSQL Injection as pw', function() {
        it('should be successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Fill form
                element.all(by.model('auth.data.login.user.username')).get(1).sendKeys('customer1');
                element.all(by.model('auth.data.login.user.password')).get(1).sendKeys('{"$ne": null}');
                //Submit form
                element.all(by.buttonText('Login')).get(1).click();
                browser.sleep(250);
                //Check
                expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Peter Holzmann');
            });
        });
    });
});
