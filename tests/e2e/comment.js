'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Comment and Rating', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    describe('Adding a comment', () => {
        it('should be successfully', () => {
            //Add a Comment
            element(by.linkText('Shop')).click();
            //Get first product
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                //Open Comment
                firstProduct.element(by.buttonText('Rate')).click();
                browser.sleep(250);
                firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
                //Fill form
                let commentField = firstProduct.element(by.model('rating.comment'));
                commentField.clear().then(() => {
                    commentField.sendKeys('Nice Product');
                    //Submit form
                    firstProduct.element(by.buttonText('Save')).click();
                    expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Rating saved successfully.\n×");
                });
            });
        });

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
        it('should be successfully', () => {
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
                    expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Rating updated successfully.\n×");
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
        let messageFromUserB = "Cool Product";
        it('User B should not see User A comment in comment field', () => {
            HelperFunctions.logout(browser);
            HelperFunctions.login(browser, 'customer1', 'compass1');
            //Goto Shop
            element(by.linkText('Shop')).click();
            //Check if Comment in Comment Field
            element.all(by.repeater('product in shop.products')).then((products) => {
                let firstProduct = products[0];
                expect(firstProduct.element(by.model('rating.comment')).getAttribute('value').getText()).toEqual('');
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
                expect(firstProduct.element(by.model('rating.comment')).getAttribute('value').getText()).toEqual('');
                firstProduct.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
                //Fill form
                let commentField = firstProduct.element(by.model('rating.comment'));
                commentField.clear().then(() => {
                    commentField.sendKeys(messageFromUserB);
                    //Submit form
                    firstProduct.element(by.buttonText('Save')).click();
                    expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Rating saved successfully.\n×");
                    expect(firstProduct.element(by.model('rating.comment')).getAttribute('value')).toEqual(messageFromUserB);
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

    describe('TopRated and Latest Product Profile Link', () => {

        it('topRated products should have working link to user profile', () => {
            element(by.className('sidebar-right')).element(by.binding('topRatedProductRating._account.username')).getAttribute('href').then((link) => {
                let lastSegment = link.split('/').filter((el) => {
                    return !!el;
                }).pop();
                element(by.binding('topRatedProductRating._account.username')).click();
                browser.getCurrentUrl().then((url) => {
                    expect(url).toContain(lastSegment);
                });
            });
        });

        it('latestProducts should have working link to user profile', () => {
            //Add a Comment
            element(by.linkText('Shop')).click();
            element(by.binding('latestProduct.name')).getText().then((latestProductName) => {
                element.all(by.repeater('product in shop.products')).then((products) => {
                    for (let product of products) {
                        product.element(by.binding('product.name')).getText().then((productName) => {
                            if (latestProductName.indexOf(productName) > -1) {
                                //Open Comment
                                product.element(by.buttonText('Rate')).click();
                                browser.sleep(250);
                                product.all(by.css('.form-group .jk-rating-stars-container .button.star-button')).get(4).click();
                                //Fill form
                                let commentField = product.element(by.model('rating.comment'));
                                commentField.clear().then(() => {
                                    commentField.sendKeys('latest product');
                                    //Submit form
                                    product.element(by.buttonText('Save')).click();
                                });
                            }
                        });
                    }
                });
            });
            element(by.className('sidebar-right')).element(by.binding('latestProductRating._account.username')).getAttribute('href').then((link) => {
                let lastSegment = link.split('/').filter((el) => {return !!el;}).pop();
                element(by.binding('latestProductRating._account.username')).click();
                browser.getCurrentUrl().then((url) => {
                    expect(url).toContain(lastSegment);
                });
            });
        });
    });
});
