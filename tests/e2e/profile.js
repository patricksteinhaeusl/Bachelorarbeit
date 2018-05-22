'use strict';
const path = require('path');
const HelperFunctions = require('./helperFunctions.js');

describe('Profile Tests', function () {

    describe('Basic Profile Functions', function () {

        beforeAll(function () {
            HelperFunctions.login(browser, 'customer0', 'compass0');
        });

        afterAll(function () {
            HelperFunctions.logout(browser);
        });

        beforeEach(function () {
            browser.get(browser.params.webshop);
        });

        it('Test Share', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            element(by.partialLinkText('#!/account')).getText().then(function (url) {
                let secondLastSegment = url.split('/').filter(el => !!el);
                secondLastSegment = secondLastSegment[secondLastSegment.length-2];
                browser.get(browser.params.webshop + '/#!/account/' + secondLastSegment + '/profile');
                browser.getCurrentUrl().then(function (url) {
                    expect(url).toContain("/#!/account/" + secondLastSegment + "/profile");
                });
            });
            expect(element(by.tagName('h1')).getAttribute('innerText')).toBe("Welcome to my profile");
        });

        it('Test example Template reachable', function (done) {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Account')).click();
            browser.sleep(250);
            element(by.linkText('sample template')).getAttribute('href').then(function(link){
                let result;
                result = HelperFunctions.httpRequest(link, null, false, "HEAD")
                    .then(function (result) {
                        done();
                        return result;
                    });
                result.then((text) => {
                    expect(text.statusCode).toBe(200);
                });
            });
        });
    });

    describe('Update profile', function () {

        beforeAll(function () {
            HelperFunctions.registerUser(browser, "Profile","Muster","customer250");
        });

        afterAll(function () {
            HelperFunctions.logout(browser);
        });

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
            let pathToFile = '../assets/profile.html';
            let absolutePathToFile = path.resolve(__dirname, pathToFile);
            element(by.model('account.data.profile')).sendKeys(absolutePathToFile);
            element(by.buttonText('Upload')).click();
            browser.sleep(500);
            //Link
            element(by.partialLinkText('#!/account')).getText().then(function (url) {
                let secondLastSegment = url.split('/').filter(el => !!el);
                secondLastSegment = secondLastSegment[secondLastSegment.length-2];
                browser.get(browser.params.webshop + '/#!/account/' + secondLastSegment + '/profile');
                browser.getCurrentUrl().then(function (url) {
                    expect(url).toContain("/#!/account/" + secondLastSegment + "/profile");
                });
            });
            expect(element.all(by.css('.profile-fields p')).get(0).getText()).toBe('Dancing');
            expect(element.all(by.css('.profile-fields p')).get(1).getText()).toBe('Pizza');
            expect(element.all(by.css('.profile-fields p')).get(2).getText()).toBe('Duck');
        });
    });
});
