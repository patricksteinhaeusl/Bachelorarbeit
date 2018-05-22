'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Auth', () => {
    describe('Login', () => {
        it('should fail', () => {
            HelperFunctions.login(browser, 'customer0', 'compass1');
            //Check
            expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
        });

        it('should success', () => {
            HelperFunctions.login(browser, 'customer0', 'compass0');
            //Check
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Juliane Schulze');
        });
    });

    describe('Logout', () => {
        it('should success', checkLogoutSuccessfully);
    });

    describe('Registration', () => {

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        it('should success', () => {
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
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Hans Muster');
        });

        it('should success', checkLogoutSuccessfully);

        it('with same user should fail', () => {
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
            expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
        });
    });
});

function checkLogoutSuccessfully() {
    HelperFunctions.logout(browser);
    //Check
    expect(element.all(by.css('.menu-item-username')).count()).toBe(0);
}
