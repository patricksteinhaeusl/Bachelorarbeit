'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('SSRF', function () {
    let result;
    let resultNormal;
    let pictureURL = browser.params.webshop.toString().replace("https://", "http://") + ":8765/file002.jpg";
    let pictureURLNormal = browser.params.webshop + "/file002.jpg";

    beforeAll(function (done) {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        result = HelperFunctions.httpRequest(pictureURL).then(function (result) {
            done();
            return result;
        });
        resultNormal = HelperFunctions.httpRequest(pictureURLNormal).then(function (result) {
            done();
            return result;
        });
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    it('picture should not be reachable on normal server', function () {
        resultNormal.then((text) => {
            expect(text.statusCode).toBe(404);
        });
    });

    it('picture has to be reachable on seperate server', function () {
        result.then((text) => {
            expect(text.statusCode).toBe(200);
        });
    });

    it('picture should have right content type', function () {
        result.then((text) => {
            expect(JSON.stringify(text.headers)).toContain("image/jpeg");
        });
    });

    it('adding hidden Picture as community post should work', function () {
        //Link
        element(by.linkText('Community')).click();
        browser.sleep(250);
        element.all(by.model('community.type')).get(1).click();
        //Fill form
        element(by.model('community.data.post.title')).sendKeys('Hidden Treasure...');
        element(by.model('community.data.post.text')).sendKeys('...I am going to find you.');
        element(by.model('community.data.url')).sendKeys(pictureURL);
        //Check
        expect(element(by.buttonText('Save')).isEnabled()).toBe(true);
        //Submit form
        element(by.buttonText('Save')).click();
        browser.sleep(250);
        expect(element.all(by.className('alert')).get(0).getText()).toBe("Success: Post successfully created.\n×");
    });

    it('hidden picture should be visible on home', function () {
        element(by.linkText('Home')).click();
        let posts = element.all(by.repeater('post in home.data.posts'));
        //Check
        expect(posts.last().getText()).toContain('Hidden Treasure...');
        expect(posts.last().getText()).toContain('...I am going to find you.');
        let image = posts.all(by.css('.post-image')).last();
        //Check
        expect(image.isDisplayed()).toBe(true);
    });
});
