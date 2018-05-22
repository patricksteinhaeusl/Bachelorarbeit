'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Comment and Rating', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        //Add a Comment
        element(by.linkText('Shop')).click();
        //Get first product
        element.all(by.repeater('product in shop.products')).then((products) => {
            let firstProduct = products[0];
            //Open Comment
            firstProduct.element(by.buttonText('Rate')).click();
            browser.sleep(250);
            //Reset Stars and then Set them
            firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
            //Fill form
            let commentField = firstProduct.element(by.name('comment'));
            commentField.clear().then(() => {
                commentField.sendKeys('Nice Product');
                //Submit form
                firstProduct.element(by.buttonText('Save')).click();
            });
        });
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    describe('Adding a comment', () => {
        it('should have correct text', () => {
            //Goto Shop
            element(by.linkText('Shop')).click();
            //Check if Comment in Comment Field
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                //Open Comment
                firstProduct.element(by.buttonText('Rate')).click();
                browser.sleep(250);
                expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('Nice Product');
            });
        });

        it('should have correct rating', () => {
            //Goto Shop
            element(by.linkText('Shop')).click();
            //Check if Product is now topRated and also stars count
            element.all(by.repeater('topRatedProduct in topRated.products')).then((topRated) => {
                let firstRatedProductText = topRated[0].element(by.binding('topRatedProduct.name'));
                let allStars = topRated[0].all(by.css('.button.star-button.ng-scope.star-on'));
                expect(firstRatedProductText.getText()).toBe('Berner Treicheln - Steiner, Wynigen');
                expect(allStars.count()).toBe(5);
            });
        });

    });

    describe('Editing a comment', () => {
        beforeAll(() => {
            //Goto Shop
            element(by.linkText('Shop')).click();
            //get first product which has already a comment and edit it
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('Nice Product');
                //Reset Stars and then Set them
                firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(2).click();
                //Fill form
                let commentField = firstProduct.element(by.name('comment'));
                commentField.clear().then(() => {
                    commentField.sendKeys('Not so nice Product');
                    //Submit form
                    firstProduct.element(by.buttonText('Update')).click();
                });
            });
        });

        it('should have new text', () => {
            //Goto Shop
            element(by.linkText('Shop')).click();
            //Check if Comment in Comment Field
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('Not so nice Product');
            });
        });

        it('should have new rating', () => {
            //Goto Shop
            element(by.linkText('Shop')).click();
            //Check if Product is now topRated and also stars count
            element.all(by.repeater('topRatedProduct in topRated.products')).then((topRated) => {
                let firstRatedProductText = topRated[0].element(by.binding('topRatedProduct.name'));
                let allStars = topRated[0].all(by.css('.button.star-button.ng-scope.star-on'));
                expect(firstRatedProductText.getText()).toBe('Berner Treicheln - Steiner, Wynigen');
                expect(allStars.count()).toBe(3);
            });
        });

    });

    describe('Comments from multiple Users', () => {
        it('User B should not see User A comment in comment field', () => {
            HelperFunctions.logout(browser);
            HelperFunctions.login(browser, 'customer1', 'compass1');
            //Goto Shop
            element(by.linkText('Shop')).click();
            //Check if Comment in Comment Field
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('');
            });
        });

        it('User B should be able to comment on same product like User A', () => {
            //Get first product
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                //Open Comment
                firstProduct.element(by.buttonText('Rate')).click();
                browser.sleep(250);
                //Check if Comment is empty
                expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('');
                //Reset Stars and then Set them
                firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
                //Fill form
                let commentField = firstProduct.element(by.name('comment'));
                commentField.clear().then(() => {
                    commentField.sendKeys('Cool Product');
                    //Submit form
                    firstProduct.element(by.buttonText('Save')).click();
                    browser.sleep(250);
                    //Check if Comment in Comment Field
                    expect(firstProduct.element(by.name('comment')).getAttribute('value')).toEqual('Cool Product');
                });
            });

        });

        it('multiple ratings on one product should have right average ', () => {
            element.all(by.repeater('topRatedProduct in topRated.products')).then((topRated) => {
                let topRatedValue = topRated[0].element(by.binding('topRatedProduct.rating.value'));
                expect(topRatedValue.getText()).toBe('∅ 4');
            });
        });
    });
});
