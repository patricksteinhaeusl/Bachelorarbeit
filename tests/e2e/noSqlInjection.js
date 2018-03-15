'use strict';

describe('Auth - NoSQL Injection', function() {
    afterEach(function() {
        browser.get('http://localhost:3000/').then(function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Submit form
            element(by.buttonText('Logout')).click();
            browser.sleep(250);
        });
    });

    describe('Login with username and password', function() {
        it('should be successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Fill form
                element(by.model('auth.data.login.user.username')).sendKeys('{"$ne": null}');
                element(by.model('auth.data.login.user.password')).sendKeys('{"$ne": null}');
                //Submit form
                element(by.buttonText('Login')).click();
                browser.sleep(250);
                //Check
                expect(element.all(by.css('.menu-item-username')).get(0).getText().length).not.toBe(0);
            });
        });
    });

    describe('Login with password', function() {
        it('should be successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Fill form
                element(by.model('auth.data.login.user.username')).sendKeys('customer1');
                element(by.model('auth.data.login.user.password')).sendKeys('{"$ne": null}');
                //Submit form
                element(by.buttonText('Login')).click();
                browser.sleep(250);
                //Check
                expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Peter Holzmann');
            });
        });
    });
});
