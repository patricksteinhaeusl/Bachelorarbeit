'use strict';
const HelperFunctions = require('./helperFunctions.js')

describe('Order and Cart Processes', function () {
    beforeAll(function () {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.login();
        });
    });

    afterAll(function () {
        browser.get('http://localhost:3000/').then(function () {
            HelperFunctions.logout();
        });
    });

    describe('Cart Operations', function () {
        it('should be possible to add items to cart and display cart', function () {
            browser.get('http://localhost:3000/#!/shop').then(function () {
                browser.sleep(5000);
                element.all(by.repeater('product in shop.data.products')).then(function(products) {
                    products[0].element(by.css('.glyphicon.glyphicon-shopping-cart')).get(0).click();
                });
                expect(element(by.className('cart-menu').getCssValue('display')).toBe('block'));
            });
        });

        it('should be possible to delete items from cart', function () {


        });
    });


    describe('Order Process', function () {
        it('should have the same items in cart as in order overview', function () {
            browser.get('http://localhost:3000/#!/shop').then(function () {

            });
        });

        it('should have same addresses as in the settings', function () {


        });

        it('should not proceed without selected address', function () {


        });

        it('should proceed with selected address', function () {


        });

        it('should not proceed without selected method of payment', function () {


        });

        it('should have same creditcards as in the settings', function () {


        });

        it('should not proceed if no creditcard selected', function () {


        });

        it('should proceed if creditcard selected', function () {


        });

        it('should proceed if bill selected', function () {


        });
    });


});
