'use strict';
const HelperFunctions = require('./helperFunctions.js')

describe('Account', function() {
    beforeAll(function () {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.login();
        });
    });

    afterAll(function () {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.logout();
        });
    });

    describe('Credit card', function() {
        describe('view', function() {
            it('should be one credit card', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Credit Cards')).click();
                    browser.sleep(250);
                    //Repeater
                    let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                    expect(creditCards.count()).toBe(1);
                    expect(creditCards.get(0).getText()).toContain('5404000000000001 Mastercard');
                });
            });
        });

        describe('add', function() {
            it('should be successfully', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Credit Cards')).click();
                    browser.sleep(250);
                    //link
                    element(by.buttonText('Add')).click();
                    browser.sleep(250);
                    //Fill form
                    element(by.model('creditCard.data.creditCard.number')).sendKeys('5404000000000033');
                    element(by.model('creditCard.data.creditCard.type')).sendKeys('Mastercard');
                    //Submit form
                    element(by.buttonText('Save')).click();
                    browser.sleep(250);
                });
            });
        });

        describe('verify add', function() {
            it('should be two creditcards', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Credit Cards')).click();
                    browser.sleep(250);
                    //Repeater
                    let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                    expect(creditCards.count()).toBe(2);
                    expect(creditCards.get(1).getText()).toContain('5404000000000033 Mastercard');
                });
            });
        });

        describe('delete', function() {
            it('should be successfully', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Credit Cards')).click();
                    browser.sleep(250);
                    //link
                    element(by.buttonText('Remove')).click();
                    browser.sleep(5000);
                });
            });
        });

        describe('verify delete', function() {
            it('should be one credit card', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Credit Cards')).click();
                    browser.sleep(250);
                    //Repeater
                    let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                    expect(creditCards.count()).toBe(1);
                });
            });
        });
    });

    describe('Delivery Address', function() {
        describe('view', function() {
            it('should be one delivery address', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Delivery Addresses')).click();
                    browser.sleep(250);
                    //Repeater
                    let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                    expect(deliveryAddresses.count()).toBe(1);
                    expect(deliveryAddresses.get(0).getText()).toContain('');
                });
            });
        });

        describe('add', function() {
            it('should success', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Delivery Addresses')).click();
                    browser.sleep(250);
                    //link
                    element(by.buttonText('Add')).click();
                    browser.sleep(250);
                    //Fill form
                    element(by.model('deliveryAddress.data.deliveryAddress.street')).sendKeys('Bahnhofstrasse 52');
                    element(by.model('deliveryAddress.data.deliveryAddress.zip')).sendKeys('9001');
                    element(by.model('deliveryAddress.data.deliveryAddress.city')).sendKeys('Bern');
                    element(by.model('deliveryAddress.data.deliveryAddress.country')).sendKeys('Schweiz');
                    //Submit form
                    element(by.buttonText('Save')).click();
                    browser.sleep(250);
                });
            });
        });

        describe('verify add', function() {
            it('should be two creditcards', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Delivery Addresses')).click();
                    browser.sleep(250);
                    //Repeater
                    let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                    expect(deliveryAddresses.count()).toBe(2);
                    expect(deliveryAddresses.get(1).getText()).toContain('Street:Bahnhofstrasse 52\nZip:9001\nCity:Bern\nCountry:Schweiz\n');
                });
            });
        });

        describe('delete', function() {
            it('should success', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Delivery Addresses')).click();
                    browser.sleep(250);
                    //link
                    element(by.buttonText('Remove')).click();
                    browser.sleep(5000);
                });
            });
        });

        describe('verify delete', function() {
            it('should be one credit card', function () {
                browser.get('http://localhost:3000/').then(function () {
                    //Open Auth Menu
                    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                    browser.sleep(250);
                    //Link
                    element(by.linkText('Delivery Addresses')).click();
                    browser.sleep(250);
                    //Repeater
                    let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                    expect(deliveryAddresses.count()).toBe(1);
                });
            });
        });
    });
});
