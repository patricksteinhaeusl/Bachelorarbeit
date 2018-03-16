'use strict';

describe('Order and Cart Processes', function () {
    beforeAll(function () {
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

    afterAll(function () {
        browser.get('http://localhost:3000/').then(function () {
            //Open Auth Menu
            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Submit form
            element(by.buttonText('Logout')).click();
            browser.sleep(250);
        });
    });

    describe('Cart Operations', function () {
        it('should be possible to add items to cart', function () {
            browser.get('http://localhost:3000/#!/shop').then(function () {

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
