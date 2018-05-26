'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('User Profile Directory', () => {

    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('it should be the right amount of users', () => {
        //Link
        element(by.linkText('Profile Directory')).click();
        browser.sleep(250);
        expect(element.all(by.repeater('profile in profile.accounts')).count()).toBe(12);
    });

    it('Users should have right properties', () => {
        //Link
        element(by.linkText('Profile Directory')).click();
        browser.sleep(250);
        element.all(by.repeater('profile in profile.accounts')).getText().then((profiles) => {
            expect(profiles[0]).toContain("Juliane Schulze");
        });
    });

    it('Link to Profiles should work', (done) => {
        //Link
        element(by.linkText('Profile Directory')).click();
        browser.sleep(250);
        element.all(by.repeater('profile in profile.accounts')).then((profiles) => {
            element(by.linkText('Click me')).getAttribute('href').then((link) => {
                let result = HelperFunctions.httpRequest(link, null, false, "HEAD")
                    .then((result) => {
                        done();
                        return result;
                    });
                result.then((text) => {
                    expect(text.statusCode).toBe(200);
                });
            });
            profiles[0].element(by.linkText('Click me')).click();
        });
        expect(element(by.tagName('h1')).getAttribute('innerText')).toBe("Welcome to my profile");
    });
});
