'use strict';
const HelperFunctions = require('./helperFunctions.js');
const path = require('path');

describe('Post - SVG Injection', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    describe('Add with data', function () {
        it('should success', function () {
            browser.get(browser.params.webshop).then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Community')).click();
                browser.sleep(250);
                //Check if Save Button is disabled
                expect(element(by.buttonText('Save')).isEnabled()).toBe(false);
                //Select Upload
                element.all(by.model('community.type')).get(0).click();
                //Fill form
                let pathToFile = '../assets/default.svg';
                let absolutePathToFile = path.resolve(__dirname, pathToFile);
                element(by.model('community.data.post.title')).sendKeys('Ein perfektes Produkt');
                element(by.model('community.data.post.text')).sendKeys('Ein perfektes Produkt zum verlieben.');
                element.all(by.model('community.data.postImage')).get(0).sendKeys(absolutePathToFile);
                //Check
                expect(element(by.buttonText('Save')).isEnabled()).toBe(true);
                expect(element.all(by.css('.thumbnail')).get(0).isDisplayed()).toBe(true);
                //Submit form
                element(by.buttonText('Save')).click();
                browser.sleep(250);
            });
        });
    });

    describe('View', function () {
        it('should success', function () {
            browser.get(browser.params.webshop).then(function () {

                browser.manage().logs().get('browser').then(function(browserLog) {
                    require('util').inspect(browserLog);
                    expect(browserLog[browserLog.length-1].message).toContain('SVG Injection');
                });

                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Home')).click();
                browser.sleep(250);

                let posts = element.all(by.repeater('post in home.data.posts'));
                //Check
                expect(posts.last().getText()).toContain('Ein perfektes Produkt\n');
                expect(posts.last().getText()).toContain('Ein perfektes Produkt zum verlieben.');
                let image = posts.all(by.css('.post-image')).get(0);
                //Check
                expect(image.isDisplayed()).toBe(true);
            });
        });
    });

    describe('Delete', function () {
        it('should success', function () {
            browser.get(browser.params.webshop).then(function () {

                browser.manage().logs().get('browser').then(function(browserLog) {
                    require('util').inspect(browserLog);
                    expect(browserLog[browserLog.length-1].message).toContain('SVG Injection');
                });

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
});
