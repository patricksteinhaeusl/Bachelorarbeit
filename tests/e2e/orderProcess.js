'use strict';
const HelperFunctions = require('./helperFunctions.js');
let ccSettings, addressSettings, sumPrice, orderID, product1Name, product1Price, product1PriceReal, product1Quantity,
    product2Name,
    product2Price, product3Name, product3Price, quantity = 7;

describe('Order and Cart Processes:', () => {
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

    describe('Cart Operations:', () => {
        it('cart should be invisible before any operation', () => {
            expect(element.all(by.className('cart-menu')).get(0).getCssValue('display')).toBe('none');
        });

        it('should be possible to add items with different quantity and correct Properties', () => {
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

        it('calculation for exporting should be displayed and be correct', () => {
            //Fill form
            element(by.model('orders.export.from')).clear().then(() => {
                element(by.model('orders.export.from')).sendKeys("1");
            });
            element(by.model('orders.export.quantity')).clear().then(() => {
                element(by.model('orders.export.quantity')).sendKeys("4");
            });
            expect(element(by.className('order-Export-Message')).getText()).toBe("Your selection will export orders 1 to 5");
            element(by.model('orders.export.from')).clear().then(() => {
                element(by.model('orders.export.from')).sendKeys("f");
            });
            element(by.model('orders.export.quantity')).clear().then(() => {
                element(by.model('orders.export.quantity')).sendKeys("4g");
            });
            expect(element(by.className('order-Export-Message')).getText()).toBe("Your selection will export orders NaN to NaN");
        });
    });

    describe('Order Process without existing CreditCard and Address', () => {

        beforeAll(() => {
            HelperFunctions.logout(browser);
            HelperFunctions.registerUser("Order", "Muster", "customer250");
        });

        it('should display message with link if no Address is present', () => {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=1').then(() => {
                element.all(by.repeater('product in shop.products')).then((products) => {
                    products[0].element(by.buttonText('Add to cart')).click();
                });
            });
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=1').then(() => {
                element.all(by.css('.glyphicon.glyphicon-shopping-cart')).get(0).click();
                browser.sleep(250);
                element.all(by.buttonText('Check out')).get(1).click();
                element.all(by.buttonText('Next')).click();
                element(by.linkText('link')).getAttribute('href').then((link) => {
                    expect(link).toContain("/#!/deliveryaddresses");
                });
                element(by.linkText('link')).click();
                browser.getCurrentUrl().then((url) => {
                    expect(url).toContain("/#!/deliveryaddresses");
                });
            });
        });

        it('should display message with link if no CC is present', () => {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=1').then(() => {
                element.all(by.repeater('product in shop.products')).then((products) => {
                    products[0].element(by.css('.glyphicon.glyphicon-shopping-cart')).click();
                });
                browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=1').then(() => {
                    element.all(by.css('.glyphicon.glyphicon-shopping-cart')).get(0).click();
                    browser.sleep(250);
                    element.all(by.buttonText('Check out')).get(1).click();
                    element.all(by.buttonText('Next')).click();
                    element(by.linkText('link')).click();
                    browser.getCurrentUrl().then((url) => {
                        expect(url).toContain("/#!/deliveryaddresses");
                        //link
                        element(by.buttonText('Add')).click();
                        browser.sleep(250);
                        //Fill form
                        element(by.model('deliveryAddress.data.deliveryAddress.street')).sendKeys('Bahnhofstrasse 52');
                        element(by.model('deliveryAddress.data.deliveryAddress.zip')).sendKeys('9001');
                        element(by.model('deliveryAddress.data.deliveryAddress.city')).sendKeys('Bern');
                        element(by.model('deliveryAddress.data.deliveryAddress.country')).sendKeys('Schweiz');
                        //Submit form
                        element(by.buttonText('Save')).click();
                    });
                    browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=1').then(() => {
                        element.all(by.css('.glyphicon.glyphicon-shopping-cart')).get(0).click();
                        browser.sleep(250);
                        element.all(by.buttonText('Check out')).get(1).click();
                        element.all(by.buttonText('Next')).click();
                        element.all(by.buttonText('Next')).click();
                        element(by.linkText('link')).getAttribute('href').then((link) => {
                            expect(link).toContain("/#!/creditcards");
                        });
                        element(by.linkText('link')).click();
                        browser.getCurrentUrl().then((url) => {
                            expect(url).toContain("/#!/creditcards");
                        });
                    });
                });
            });
        });
    });
});
