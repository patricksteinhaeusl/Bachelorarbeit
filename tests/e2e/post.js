'use strict';

const path = require('path');

describe('Post', function() {
    beforeEach(function () {
        browser.get('http://localhost:3000/').then(function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Fill form
            element(by.model('auth.data.login.user.username')).sendKeys('customer0');
            element(by.model('auth.data.login.user.password')).sendKeys('compass0');
            //Submit form
            element(by.buttonText('Login')).click();
            browser.sleep(250);
        });
    });
    
    afterEach(function () {
        browser.get('http://localhost:3000/').then(function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Submit form
            element(by.buttonText('Logout')).click();
            browser.sleep(250);
        });
    });

    describe('Add with data', function() {
        it('should success', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Community')).click();
                //Fill form
                let pathToFile = '../../assets/post-images/default.png';
                let absolutePathToFile = path.resolve(__dirname, pathToFile);
                element(by.model('community.data.post.title')).sendKeys('Ein perfektes Produkt');
                element(by.model('community.data.post.text')).sendKeys('Ein perfektes Produkt zum verlieben.');
                browser.sleep(250);
                element.all(by.model('community.data.postImage')).get(1).sendKeys(absolutePathToFile);
                //Check
                expect(element.all(by.css('.thumbnail')).get(0).isDisplayed()).toBe(true);
                //Submit form
                element(by.buttonText('Save')).click();
                browser.sleep(250);
            });
        });
    });

    describe('View', function() {
        it('should success', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Link
                element(by.linkText('Home')).click();
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
});

//TODO NO DATA TEST
