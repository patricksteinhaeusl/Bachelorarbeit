'use strict';
const path = require('path');
const HelperFunctions = require('./helperFunctions.js');

describe('Template Injection', function () {

    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    describe('Update profile', function () {

        beforeEach(function () {
            browser.get(browser.params.webshop);
        });

        it('default profile edited', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            //Fill form
            let pathToFile = '../../assets/profile.html';
            let absolutePathToFile = path.resolve(__dirname, pathToFile);
            element(by.model('account.data.profile')).sendKeys(absolutePathToFile);
            element(by.buttonText('Upload')).click();
            browser.sleep(500);
            //Link
            browser.get(browser.params.webshop + '/#!/account/5aa0481e876d9d39d4397859/profile');
            browser.sleep(250);

            expect(element.all(by.css('.profile-fields p')).get(0).getText()).toBe('Fencing');
            expect(element.all(by.css('.profile-fields p')).get(1).getText()).toBe('Lassagne');
            expect(element.all(by.css('.profile-fields p')).get(2).getText()).toBe('Horse');
        });

        it('injected profile edited', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            //Fill form
            let pathToFile = '../../assets/profileInjection.html';
            let absolutePathToFile = path.resolve(__dirname, pathToFile);
            element(by.model('account.data.profile')).sendKeys(absolutePathToFile);
            element(by.buttonText('Upload')).click();
            browser.sleep(500);
            //Link
            element(by.linkText('My Profile')).click();
            browser.sleep(250);

            expect(element(by.css('.templateInjection')).getText()).toBe(
                '{"isRetailer":false,"_id":"5aa0481e876d9d39d4397859","username":"customer0",' +
                '"firstname":"Juliane","lastname":"Schulze","email":"Juliane.Schulze@gmail.com"}');
        });

        it('default profile edited', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            //Fill form
            let pathToFile = '../../assets/profile.html';
            let absolutePathToFile = path.resolve(__dirname, pathToFile);
            element(by.model('account.data.profile')).sendKeys(absolutePathToFile);
            element(by.buttonText('Upload')).click();
            browser.sleep(500);
            //Link
            element(by.linkText('My Profile')).click();
            browser.sleep(250);

            expect(element.all(by.css('.profile-fields p')).get(0).getText()).toBe('Fencing');
            expect(element.all(by.css('.profile-fields p')).get(1).getText()).toBe('Lassagne');
            expect(element.all(by.css('.profile-fields p')).get(2).getText()).toBe('Horse');
        });
    });
});
