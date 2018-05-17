'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Auth', function () {
    describe('Login', function () {
        it('should fail with wrong credentials', function () {
            HelperFunctions.login(browser, 'customer0', 'compass1');
            //Check
            expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
        });

        it('should success with correct credentials', function () {
            HelperFunctions.login(browser, 'customer0', 'compass0');
            //Check
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Juliane Schulze');
        });
    });

    describe('Logout', function () {
        it('should success', function () {
            HelperFunctions.logout(browser);
            //Check
            expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
        });
    });

    describe('Registration', function () {
        beforeEach(function() {
            browser.get(browser.params.webshop);
        });
        it('should successfully register', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('Register')).click();
            //Fill form
            element(by.model('auth.data.register.account.firstname')).sendKeys('Hans');
            element(by.model('auth.data.register.account.lastname')).sendKeys('Muster');
            element(by.model('auth.data.register.account.email')).sendKeys('hans.muster@gmail.com');
            element(by.model('auth.data.register.account.username')).sendKeys('hans_muster');
            element(by.model('auth.data.register.account.password')).sendKeys('customer250');
            //Submit form
            element(by.buttonText('Register')).click();
            browser.sleep(250);
            //Check
            expect(element.all(by.className('alert')).get(0).getText()).toBe("Success: Registration successfully\n×");
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Hans Muster');
        });

        it('logout should success', function () {
            HelperFunctions.logout(browser);
            //Check
            expect(element.all(by.className('alert')).get(0).getText()).toBe("Success: Logout successfully\n×");
            expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
        });

        it('with same user should fail', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('Register')).click();
            //Fill form
            element(by.model('auth.data.register.account.firstname')).sendKeys('Hans');
            element(by.model('auth.data.register.account.lastname')).sendKeys('Muster');
            element(by.model('auth.data.register.account.email')).sendKeys('hans.muster@gmail.com');
            element(by.model('auth.data.register.account.username')).sendKeys('hans_muster');
            element(by.model('auth.data.register.account.password')).sendKeys('customer250');
            //Submit form
            element(by.buttonText('Register')).click();
            browser.sleep(250);
            expect(element.all(by.className('alert')).get(0).getText()).toContain("already exists!");
            //Check
            expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
        });
    });
});
