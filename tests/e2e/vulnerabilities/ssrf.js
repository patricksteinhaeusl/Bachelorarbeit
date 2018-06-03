'use strict';
const HelperFunctions = require('../helperFunctions.js');
const urlParse = require("url");

describe('SSRF', () => {
    let result;
    let resultNormal;
    let parsedUrl = urlParse.parse(browser.params.webshop);
    let pictureURL = "http://" + parsedUrl.hostname + ":8765/file002.jpg";
    let pictureURLNormal = browser.params.webshop + "/file002.jpg";

    beforeAll((done) => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        result = HelperFunctions.httpRequest(pictureURL).then((result) => {
            done();
            return result;
        });
        resultNormal = HelperFunctions.httpRequest(pictureURLNormal).then((result) => {
            done();
            return result;
        });
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('picture should not be reachable on normal server', () => {
        resultNormal.then((text) => {
            expect(text.statusCode).toBe(404);
        });
    });

    it('picture has to be reachable on seperate server', () => {
        result.then((text) => {
            expect(text.statusCode).toBe(200);
        });
    });

    it('picture should have right content type', () => {
        result.then((text) => {
            expect(JSON.stringify(text.headers)).toContain("image/jpeg");
        });
    });

    it('adding hidden Picture as community post should work', () => {
        //Link
        element(by.linkText('Community')).click();
        browser.sleep(250);
        element.all(by.model('post.type')).get(1).click();
        //Fill form
        element(by.model('post.data.post.title')).sendKeys('Hidden Treasure...');
        element(by.model('post.data.post.text')).sendKeys('...I am going to find you.');
        element(by.model('post.data.url')).sendKeys(pictureURL);
        //Check
        expect(element(by.buttonText('Save')).isEnabled()).toBe(true);
        //Submit form
        element(by.buttonText('Save')).click();
        browser.sleep(250);
        expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Post successfully created.\n×");
    });

    it('hidden picture should be visible on home', () => {
        element(by.linkText('Home')).click();
        let posts = element.all(by.repeater('post in posts.data.posts'));
        //Check
        expect(posts.last().getText()).toContain('Hidden Treasure...');
        expect(posts.last().getText()).toContain('...I am going to find you.');
        let image = posts.all(by.css('.post-image')).last();
        //Check
        expect(image.isDisplayed()).toBe(true);
    });
});
