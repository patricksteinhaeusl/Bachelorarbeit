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

    describe('Logout', () => {
        it('should success', checkLogoutSuccessfully);
    });

    describe('Registration', function () {
        beforeEach(function() {
            browser.get(browser.params.webshop);
        });
        it('should successfully register', function () {
            HelperFunctions.registerUser("Hans","Muster","customer250");
            //Check
            expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Registration successfully.\n×");
            expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Hans Muster');
        });

        it('should success', checkLogoutSuccessfully);

        it('with same user should fail', function () {
            HelperFunctions.registerUser("Hans","Muster","customer250");
            expect(element.all(by.className('alert')).last().getText()).toContain("already exists!");
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
