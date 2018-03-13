'use strict';

describe('Auth', function() {
    describe('Login', function() {
        it('should login fail', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(500);
                //Fill form
                element(by.model('auth.data.login.user.username')).sendKeys('customer0');
                element(by.model('auth.data.login.user.password')).sendKeys('compass1');
                //Submit form
                element(by.buttonText('Login')).click();
                browser.sleep(500);
                //Check
                expect(element.all(by.css('.menu-item-username')).isDisplayed(), false);
            });
        });

        it('should login successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(500);
                //Fill form
                element(by.model('auth.data.login.user.username')).sendKeys('customer0');
                element(by.model('auth.data.login.user.password')).sendKeys('compass0');
                //Submit form
                element(by.buttonText('Login')).click();
                browser.sleep(500);
                //Check
                expect(element.all(by.css('.menu-item-username')).get(0).getText(), 'Juliane Schulze');
            });
        });
    });

    describe('Logout', function() {
        it('should logout successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(500);
                //Submit form
                element(by.buttonText('Logout')).click();
                browser.sleep(500);
                //Check
                expect(element.all(by.css('.menu-item-username')).isDisplayed(), false);
            });
        });
    });

    describe('Registration', function() {
        it('should register successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(500);
                //Link
                element(by.linkText('Register')).click();
                //Fill form
                element(by.model('auth.data.register.account.firstname')).sendKeys('Hans');
                element(by.model('auth.data.register.account.lastname')).sendKeys('Muster');
                element(by.model('auth.data.register.account.email')).sendKeys('hans.muster@gmail.com');
                element(by.model('auth.data.register.account.username')).sendKeys('hans_muster');
                element(by.model('auth.data.register.account.password')).sendKeys('customer1000');
                //Submit form
                element(by.buttonText('Register')).click();
                //Check
                expect(element.all(by.css('.menu-item-username')).get(0).getText(), 'Hans Muster');
            });
        });

        it('should logout successfully', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(500);
                //Submit form
                element(by.buttonText('Logout')).click();
                browser.sleep(500);
                //Check
                expect(element.all(by.css('.menu-item-username')).isDisplayed(), false);
            });
        });

        it('should register fail', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(500);
                //Link
                element(by.linkText('Register')).click();
                //Fill form
                element(by.model('auth.data.register.account.firstname')).sendKeys('Hans');
                element(by.model('auth.data.register.account.lastname')).sendKeys('Muster');
                element(by.model('auth.data.register.account.email')).sendKeys('hans.muster@gmail.com');
                element(by.model('auth.data.register.account.username')).sendKeys('hans_muster');
                element(by.model('auth.data.register.account.password')).sendKeys('customer1000');
                //Submit form
                element(by.buttonText('Register')).click();
                //Check
                expect(element.all(by.css('.menu-item-username')).isDisplayed(), false);
            });
        });
    });
});
