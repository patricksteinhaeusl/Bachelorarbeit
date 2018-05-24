'use strict';
const path = require('path');
const HelperFunctions = require('../helperFunctions.js');

describe('Template Injection', () => {

    let firstName = "Injection";
    let lastName = "Muster";

    beforeAll(() => {
        HelperFunctions.registerUser(firstName,lastName,"customer250");
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    beforeEach(() => {
        browser.get(browser.params.webshop);
    });

    it('upload an test injected template', () => {
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
        element(by.partialLinkText('#!/account')).getText().then((url) => {
            let secondLastSegment = url.split('/').filter(el => !!el);
            secondLastSegment = secondLastSegment[secondLastSegment.length-2];
            element(by.linkText('Profile')).click();
            browser.sleep(250);
            browser.getCurrentUrl().then((url) => {
                expect(url).toContain("/#!/account/" + secondLastSegment + "/profile");
            });
        });

        HelperFunctions.searchBrowserConsole('Template Injection', (found) => {
            expect(found).toBe(true);
        });
    });
});

