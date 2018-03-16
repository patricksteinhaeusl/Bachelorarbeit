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
        it('should be possible to add items with correct Properties', function () {
            browser.get('http://localhost:3000/#!/shop').then(function () {
                let product1Name, product1Price, product2Name, product2Price;
                element.all(by.repeater('product in shop.data.products')).then(function(products) {
                    product1Name = products[0].element(by.binding('product.name')).getText();
                    product1Price = products[0].element(by.binding('product.price')).getText();
                    products[0].element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                    product2Name = products[1].element(by.binding('product.name')).getText();
                    product2Price = products[1].element(by.binding('product.price')).getText();
                    products[1].element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                    products[1].element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                });
                element.all(by.repeater('item in cart.data.items')).then(function(items) {
                    expect(items[0].all(by.tagName('td')).get(0).getAttribute('innerText')).toBe(product1Name);
                    expect(items[0].all(by.tagName('td')).get(1).getAttribute('innerText')).toBe('1');
                    expect(items[0].all(by.tagName('td')).get(2).getAttribute('innerText')).toBe(product1Price);
                    expect(items[1].all(by.tagName('td')).get(0).getAttribute('innerText')).toBe(product2Name);
                    expect(items[1].all(by.tagName('td')).get(1).getAttribute('innerText')).toBe('2');
                    let sumPrice = product2Price.then(function(text) {
                        return (parseInt(text.replace(/ CHF/gi, '')) * 2) + " CHF";
                    });
                    expect(items[1].all(by.tagName('td')).get(2).getAttribute('innerText')).toBe(sumPrice);

                });
            });
        });
        it('add should display cart', function () {
            expect(element(by.className('cart-menu')).getCssValue('display')).toBe('block');
        });

        it('should be possible to delete items from cart', function () {
            let items = element.all(by.repeater('item in cart.data.items'));
            element.all(by.repeater('item in cart.data.items')).count().then(function(preCount) {
                items.last().all(by.css('.glyphicon-remove')).get(0).click();
                let postCount = element.all(by.repeater('item in cart.data.items')).count();
                expect(preCount - 2).toBe(postCount);
            });

        });
    });


    describe('Order Process', function () {
/*
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



        });*/
    });


});
