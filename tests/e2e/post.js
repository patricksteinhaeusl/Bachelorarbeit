'use strict';
const HelperFunctions = require('./helperFunctions.js');
const path = require('path');

describe('Post', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    beforeEach(function() {
        browser.get('http://localhost:3000');
    });

    describe('Add with data', function () {
        it('should success', function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('Community')).click();
            browser.sleep(250);
            //Fill form
            let pathToFile = '../../assets/post-images/default.png';
            let absolutePathToFile = path.resolve(__dirname, pathToFile);
            element(by.model('community.data.post.title')).sendKeys('Ganz Toll');
            element(by.model('community.data.post.text')).sendKeys('Ein perfektes Produkt zum verlieben.');
            browser.sleep(250);
            element.all(by.model('community.data.postImage')).get(0).sendKeys(absolutePathToFile);
            //Check
            expect(element.all(by.css('.thumbnail')).get(0).isDisplayed()).toBe(true);
            //Submit form
            element(by.buttonText('Save')).click();
            browser.sleep(250);
        });
    });

    describe('View', function () {
        it('should success', function () {
            element(by.linkText('Home')).click();
            let posts = element.all(by.repeater('post in home.data.posts'));
            //Check
            expect(posts.last().getText()).toContain('Ganz Toll\n');
            expect(posts.last().getText()).toContain('Ein perfektes Produkt zum verlieben.');
            let image = posts.all(by.css('.post-image')).get(0);
            //Check
            expect(image.isDisplayed()).toBe(true);
        });
    });

    describe('Delete', function () {
        it('should success', function () {
            //Link
            element(by.linkText('Home')).click();
            browser.sleep(250);
            let posts = element.all(by.repeater('post in home.data.posts'));
            element.all(by.repeater('post in home.data.posts')).count().then(function (preCount) {
                posts.last().all(by.css('.glyphicon-trash')).get(0).click();
                let postCount = element.all(by.repeater('post in home.data.posts')).count();
                //Check
                expect(preCount - 1).toBe(postCount);
            });
        });
    });
});
