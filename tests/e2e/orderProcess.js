'use strict';
const fs = require('fs');
const path = require('path');
const HelperFunctions = require('./helperFunctions.js');
let ccSettings, addressSettings, sumPrice, orderID, product1Name, product1Price, product1PriceReal, product1Quantity, product2Name,
    product2Price, product3Name, product3Price, quantity = 7;

describe('Order and Cart Processes', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        //Save Address for later
        element(by.linkText('Delivery Addresses')).click();
        browser.sleep(250);
        addressSettings = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses')).get(0);
        //Save CC for later
        element(by.linkText('Delivery Addresses')).click();
        browser.sleep(250);
        ccSettings = element.all(by.repeater('creditCard in creditCards.data.creditCards')).get(0);
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    describe('Cart Operations', () => {
        it('cart should be invisible before any operation', () => {
            expect(element.all(by.className('cart-menu')).get(0).getCssValue('display')).toBe('none');
        });

        it('should be possible to add items with correct Properties', () => {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=1').then(() => {

                element.all(by.repeater('product in shop.products')).then((products) => {
                    let firstProduct = products[0];
                    let secondProduct = products[1];
                    let thirdProduct = products[2];
                    product1Name = firstProduct.element(by.binding('product.name')).getText();
                    product1Price = firstProduct.element(by.binding('product.price')).getText();
                    product1Price.then((text) => {
                        product1PriceReal = text.replace(' CHF', '') * 5 + ' CHF';
                    });
                    product1Quantity = firstProduct.element(by.model('product.selectedQuantity')).sendKeys('5');
                    firstProduct.element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                    product2Name = secondProduct.element(by.binding('product.name')).getText();
                    product2Price = secondProduct.element(by.binding('product.price')).getText();
                    for (let i = 0; i < quantity; i++) {
                        secondProduct.element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                    }
                    product3Name = thirdProduct.element(by.binding('product.name')).getText();
                    product3Price = thirdProduct.element(by.binding('product.price')).getText();
                    thirdProduct.element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                });
                element.all(by.repeater('item in cart.data.items')).then((items) => {
                    let firstItem = items[0];
                    let secondItem = items[1];
                    let thirdItem = items[2];
                    expect(firstItem.all(by.tagName('td')).get(0).getAttribute('innerText')).toBe(product1Name);
                    expect(firstItem.all(by.tagName('td')).get(1).getAttribute('innerText')).toBe('5');
                    expect(firstItem.all(by.tagName('td')).get(2).getAttribute('innerText')).toBe(product1PriceReal);
                    expect(secondItem.all(by.tagName('td')).get(0).getAttribute('innerText')).toBe(product2Name);
                    expect(secondItem.all(by.tagName('td')).get(1).getAttribute('innerText')).toBe(quantity.toString());
                    sumPrice = product2Price.then((text) => {
                        return (parseInt(text.replace(/ CHF/gi, '')) * quantity).toFixed(2) + " CHF";
                    });
                    expect(secondItem.all(by.tagName('td')).get(2).getAttribute('innerText')).toBe(sumPrice);
                    expect(thirdItem.all(by.tagName('td')).get(0).getAttribute('innerText')).toBe(product3Name);
                    expect(thirdItem.all(by.tagName('td')).get(1).getAttribute('innerText')).toBe('1');
                    expect(thirdItem.all(by.tagName('td')).get(2).getAttribute('innerText')).toBe(product3Price);
                });
            });
        });

        it('adding an item should display cart', () => {
            expect(element.all(by.className('cart-menu')).get(0).getCssValue('display')).toBe('block');
        });

        it('should be possible to delete items from cart', () => {
            let items = element.all(by.repeater('item in cart.data.items'));
            element.all(by.repeater('item in cart.data.items')).count().then((preCount) => {
                items.last().all(by.css('.glyphicon-remove')).get(0).click();
                let postCount = element.all(by.repeater('item in cart.data.items')).count();
                expect(preCount - 2).toBe(postCount);
            });

        });
    });

    describe('Order Process', () => {
        it('should have the same items in cart as in order overview', () => {
            browser.get(browser.params.webshop).then(() => {
                element.all(by.css('.glyphicon.glyphicon-shopping-cart')).get(0).click();
                browser.sleep(250);
                element.all(by.buttonText('Check out')).get(1).click();
                orderID = element(by.tagName('h2')).getAttribute('innerText');
                let orderItems = element.all(by.repeater('item in order.data.order.items')).count();
                element.all(by.repeater('item in cart.data.items')).count().then((cartItems) => {
                    expect(orderItems).toBe(cartItems / 2);
                });
                expect(browser.getCurrentUrl()).toContain('/checkout/overview');
                element.all(by.buttonText('Next')).get(0).click();
            });
        });

        it('should have same addresses as in the settings', () => {
            element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses')).then((address) => {
                expect(address[0].getText()).toBe(addressSettings.getText());
            });
        });

        it('should proceed with selected address', () => {
            element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses')).then((address) => {
                address[0].element(by.model('order.data.order._deliveryAddress')).click();
                expect(address[0].element(by.model('order.data.order._deliveryAddress'))
                    .getAttribute('class')).toContain('ng-pristine ng-untouched ng-valid ng-not-empty');
            });
            expect(element.all(by.buttonText('Next')).get(0).isEnabled()).toBe(true);
            element.all(by.buttonText('Next')).get(0).click();
        });

        it('should proceed with selected method of payment', () => {
            expect(browser.getCurrentUrl()).toContain('/checkout/payment');
            expect(element.all(by.buttonText('Finish')).get(0).isEnabled()).toBe(true);
        });

        it('should have same creditcard as in the settings', () => {
            element.all(by.repeater('creditCard in creditCards.data.creditCards')).then((cc) => {
                expect(cc[0].getText()).toBe(ccSettings.getText());
            });

        });

        it('should not proceed if no creditcard selected', () => {
            element(by.css(".panel input[value='creditCard']")).click();
            //Payment type must be CC
            expect(element(by.css(".panel input[value='creditCard']")).getAttribute('class'))
                .toContain('ng-pristine ng-untouched ng-valid ng-scope ng-not-empty');
            //Payment type mustn't be bill
            expect(element(by.css(".panel input[value='bill']")).getAttribute('class'))
                .not.toContain('ng-pristine ng-untouched ng-valid ng-scope ng-not-empty');
            //No CC should be selected
            element.all(by.repeater('creditCard in creditCards.data.creditCards')).each((element) => {
                expect(element.element(by.model('order.data.order.payment._creditCard'))
                    .getAttribute('class')).not.toContain('ng-pristine ng-untouched ng-valid ng-scope ng-not-empty');
            });
            expect(element.all(by.buttonText('Finish')).get(0).isEnabled()).toBe(true);
        });

        it('should proceed if creditcard selected', () => {
            element(by.css(".panel input[value='creditCard']")).click();
            //Payment type must be CC
            expect(element(by.css(".panel input[value='creditCard']")).getAttribute('class'))
                .toContain('ng-pristine ng-untouched ng-valid ng-scope ng-not-empty');
            //Payment type mustn't be bill
            expect(element(by.css(".panel input[value='bill']")).getAttribute('class'))
                .not.toContain('ng-pristine ng-untouched ng-valid ng-scope ng-not-empty');
            element.all(by.repeater('creditCard in creditCards.data.creditCards')).then((cc) => {
                cc[0].element(by.model('order.data.order.payment._creditCard')).click();
                expect(cc[0].element(by.model('order.data.order.payment._creditCard'))
                    .getAttribute('class')).toContain('ng-pristine ng-untouched ng-valid ng-not-empty');
            });
            expect(element.all(by.buttonText('Finish')).get(0).isEnabled()).toBe(true);
        });

        it('should proceed if bill selected', () => {
            element(by.css(".panel input[value='bill']")).click();
            //Payment type mustn't be CC
            expect(element(by.css(".panel input[value='creditCard']")).getAttribute('class'))
                .not.toContain('ng-valid-parse');
            //Payment type must be bill
            expect(element(by.css(".panel input[value='bill']")).getAttribute('class'))
                .toContain('ng-valid-parse');
            expect(element.all(by.buttonText('Finish')).get(0).isEnabled()).toBe(true);
            element.all(by.buttonText('Finish')).get(0).click();
        });

        it('should show correct order after finishing process', () => {
            expect(browser.getCurrentUrl()).toContain('/orders');
            expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Order successfully saved.\n×");
            element.all(by.repeater('order in orders.data.orders')).then((order) => {
                element.all(by.binding('order._id')).get(0).getText().then((firstID) => {
                    orderID.then((secondID) => {
                        expect(firstID).toBe(secondID);
                    });
                });
                order[0].all(by.repeater('item in order.items')).then((item) => {
                    item[0].all(by.binding('item.quantity')).getText().then((element) => {
                        product1Name.then((text) => {
                            expect(element.toString()).toContain(text);
                        });
                        expect(element).toContain(product1PriceReal);
                    });
                    item[1].all(by.binding('item.quantity')).getText().then((element) => {
                        product2Name.then((text) => {
                            expect(element.toString()).toContain(text);
                        });
                        sumPrice.then((text) => {
                            expect(element).toContain(text);
                        });
                    });
                });
            });
        });
    });

    describe('Print Orders', () => {
        const protractorConf = require('../protractorConf.js');

        it('should be able to export order list', () => {
            browser.get(browser.params.webshop).then(() => {
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('My Orders')).click();
                browser.sleep(250);
                //Fill form
                element(by.model('orders.export.from')).sendKeys("1");
                element(by.model('orders.export.range')).sendKeys("5");
                element(by.buttonText('Export pdf')).click();
                let fileName = 'file.pdf';
                let filePath = protractorConf.config.capabilities.chromeOptions.prefs.download.default_directory + fileName;
                browser.wait(() => {
                    try {
                        fs.accessSync(filePath, fs.constants.F_OK);
                        return true;
                    } catch (error) {
                        return false;
                    }
                }, 5000).then((exists) => {
                    expect(exists).toBe(true);
                }).then(() => {
                    browser.wait(() => {
                        try {
                            fs.unlinkSync(filePath);
                            return true;
                        } catch (error) {
                            return false;
                        }
                    }, 5000).then(function(unlinked) {
                        expect(unlinked).toBe(true);
                    });
                });
            });
        });
    });
});
