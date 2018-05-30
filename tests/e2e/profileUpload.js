'use strict';
const path = require('path');
const HelperFunctions = require('./helperFunctions.js');

describe('Profile Upload', () => {

    describe('Basic Profile Functions', () => {

        beforeAll(() => {
            HelperFunctions.login(browser, 'customer0', 'compass0');
        });

        afterAll(() => {
            HelperFunctions.logout(browser);
        });

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        it('Test Share', () => {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            element(by.model('account.textToCopy')).getAttribute('value').then((url) => {
                let lastSegment = url.split('/').filter((el) => { return !!el; }).pop();
                element(by.linkText('View Profile')).click();
                browser.sleep(250);
                browser.getCurrentUrl().then((url) => {
                    expect(url).toContain("/#!/profiles/" + lastSegment);
                });
            });
            expect(element(by.tagName('h1')).getAttribute('innerText')).toBe("Welcome to my profile");
        });

        it('Test Copy Button', () => {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            element(by.buttonText('Copy')).click();
            expect(element(by.className('copy-success-msg')).isDisplayed()).toBe(true);
        });

        it('Test if example Template reachable', (done) => {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            element(by.linkText('sample template')).getAttribute('href').then((link) => {
                let result = HelperFunctions.httpRequest(link, null, false, "HEAD")
                    .then((result) => {
                        done();
                        return result;
                    });
                result.then((text) => {
                    expect(text.statusCode).toBe(200);
                });
            });
        });
    });

    describe('Update profile', () => {

        beforeAll(() => {
            HelperFunctions.registerUser("Profile","Muster","customer250");
        });

        afterAll(() => {
            HelperFunctions.logout(browser);
        });

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        it('new user should not have a profile', () => {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('View Profile')).click();
            browser.sleep(250);
            expect(element(by.tagName('h1')).getAttribute('innerText')).toBe("Profile not found");
        });

        it('should be able to upload and save profile', () => {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            //Fill form
            let pathToFile = '../assets/profile.html';
            let absolutePathToFile = path.resolve(__dirname, pathToFile);
            element(by.model('account.data.profile')).sendKeys(absolutePathToFile);
            element(by.buttonText('Upload')).click();
            browser.sleep(500);
            //Link
            element(by.model('account.textToCopy')).getAttribute('value').then((url) => {
                let lastSegment = url.split('/').filter((el) => { return !!el; }).pop();
                element(by.linkText('View Profile')).click();
                browser.sleep(250);
                browser.getCurrentUrl().then((url) => {
                    expect(url).toContain("/#!/profiles/" + lastSegment);
                });
            });
            expect(element.all(by.css('.profile-fields p')).get(0).getText()).toBe('Dancing');
            expect(element.all(by.css('.profile-fields p')).get(1).getText()).toBe('Pizza');
            expect(element.all(by.css('.profile-fields p')).get(2).getText()).toBe('Duck');
        });
    });
});
