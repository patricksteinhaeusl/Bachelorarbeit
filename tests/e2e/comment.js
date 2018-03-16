'use strict';
const HelperFunctions = require('./helperFunctions.js')

describe('Comment and Rating', function() {
    beforeAll(function() {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.login();

            //Add a Comment
            element(by.linkText('Shop')).click();
            //Get first product
            element.all(by.repeater('product in shop.data.products')).then(function (products) {
                let firstProduct = products[0];
                //Open Comment
                firstProduct.element(by.css('.glyphicon.glyphicon-star')).click();
                browser.sleep(250);
                //Reset Stars and then Set them
                firstProduct.all(by.css('.form-group .jk-rating-stars-container .button')).first().click();
                firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
                //Fill form
                let commentField = products[0].element(by.name('comment'));
                commentField.clear().then(function () {
                    commentField.sendKeys('Nice Product');
                });
                //Submit form
                firstProduct.element(by.buttonText('Save')).click();
            });
        });
    });

    afterAll(function() {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.logout();
        });
    });

    describe('Adding a comment', function() {
        it('should have correct text', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //Check if Comment in Comment Field
                element.all(by.repeater('product in shop.data.products')).then(function(products) {
                    expect(products[0].element(by.name('comment')).getAttribute('value')).toEqual('Nice Product');
                });
            });
        });

        it('should have correct rating', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //Check if Product is now topRated and also stars count
                element.all(by.repeater('topRatedProduct in shop.data.topRatedProducts')).then(function(topRated) {
                    let firstRatedProductText = topRated[0].element(by.binding('topRatedProduct.name'));
                    let allStars = topRated[0].all(by.css('.button.star-button.ng-scope.star-on'));
                    expect(firstRatedProductText.getText()).toBe('Berner Treicheln - Steiner, Wynigen');
                    expect(allStars.count()).toBe(5);
                });
            });
        });

    });

    describe('Editing a comment', function() {
        beforeAll(function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //get first product which has already a comment and edit it
                element.all(by.repeater('product in shop.data.products')).then(function (products) {
                    let firstProduct = products[0];
                    //Open Comment
                    firstProduct.element(by.css('.glyphicon.glyphicon-star')).click();
                    browser.sleep(250);
                    expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('Nice Product');
                    //Reset Stars and then Set them
                    firstProduct.all(by.css('.form-group .jk-rating-stars-container .button')).first().click();
                    firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(2).click();
                    //Fill form
                    let commentField = products[0].element(by.name('comment'));
                    commentField.clear().then(function () {
                        commentField.sendKeys('Not so nice Product');
                    });
                    //Submit form
                    firstProduct.element(by.buttonText('Save')).click();
                });
            });
        });

        it('should have new text', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //Check if Comment in Comment Field
                element.all(by.repeater('product in shop.data.products')).then(function(products) {
                    expect(products[0].element(by.name('comment')).getAttribute('value')).toEqual('Not so nice Product');
                });
            });
        });

        it('should have new rating', function() {
            browser.get('http://localhost:3000/').then(function () {
                //Goto Shop
                element(by.linkText('Shop')).click();
                //Check if Product is now topRated and also stars count
                element.all(by.repeater('topRatedProduct in shop.data.topRatedProducts')).then(function(topRated) {
                    let firstRatedProductText = topRated[0].element(by.binding('topRatedProduct.name'));
                    let allStars = topRated[0].all(by.css('.button.star-button.ng-scope.star-on'));
                    expect(firstRatedProductText.getText()).toBe('Berner Treicheln - Steiner, Wynigen');
                    expect(allStars.count()).toBe(3);
                });
            });
        });

    });
});
