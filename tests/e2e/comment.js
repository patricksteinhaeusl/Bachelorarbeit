'use strict';

describe('Comment and Rating', function() {
    beforeAll(function() {
        browser.get('http://localhost:3000/').then(function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Fill form
            element(by.model('auth.data.login.user.username')).sendKeys('customer0');
            element(by.model('auth.data.login.user.password')).sendKeys('compass0');
            //Submit form
            element(by.buttonText('Login')).click();
            browser.sleep(2000);
        });
    });

    afterAll(function() {
        browser.get('http://localhost:3000/').then(function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Submit form
            element(by.buttonText('Logout')).click();
            browser.sleep(250);
        });
    });

    describe('Add a comment', function() {
        it('should fail without valid rating', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //Click on comment
                let comment = element.all(by.repeater('product in shop.data.products'));
                comment.get(0).element.all(by.css('glyphicon glyphicon-star ng-scope')).click();
                browser.sleep(250);
                //Fill form
                element(by.model('ratingEmptyByAccount.comment')).sendKeys('Nice Product');
                browser.sleep(500);
                //Submit form
                element(by.buttonText('Save')).click();
                browser.sleep(500);
                //Check
                expect(element.all(by.css('.menu-item-username')).isDisplayed(), false);
            });
        });

        it('should be saved with valid rating', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //Click on comment
                element(by.linkText('Shop')).click();
                browser.sleep(250);
                //Fill form
                element(by.model('ratingEmptyByAccount.comment')).sendKeys('Nice Product');
                browser.sleep(500);
                //Submit form
                element(by.buttonText('Save')).click();
                browser.sleep(500);
                //Check
                //Click on Comment
                //check for text
                //check for stars
                //Check top rated text
                //Check top rated stars
                expect(element.all(by.css('.menu-item-username')).isDisplayed(), false);
            });
        });


    });
});
