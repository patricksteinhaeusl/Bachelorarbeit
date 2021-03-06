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

    it('upload and test injected template should be successful', () => {
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
        element(by.model('account.textToCopy')).getAttribute('value').then((url) => {
            let lastSegment = url.split('/').filter((el) => { return !!el; }).pop();
            element(by.linkText('View Profile')).click();
            browser.sleep(250);
            browser.getCurrentUrl().then((url) => {
                expect(url).toContain("/#!/profiles/" + lastSegment );
            });
        });

        HelperFunctions.searchBrowserConsole('Template Injection', (found) => {
            expect(found).toBe(true);
        });
    });
});

