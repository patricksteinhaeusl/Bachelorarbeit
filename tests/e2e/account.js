'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Account', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    describe('User Information', () => {

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        describe('view', () => {
            it('should have correct information', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('My Account')).click();
                browser.sleep(250);
                expect(element(by.model('account.data.account.firstname')).getAttribute('value')).toEqual('Juliane');
                expect(element(by.model('account.data.account.lastname')).getAttribute('value')).toEqual('Schulze');
                expect(element(by.model('account.data.account.email')).getAttribute('value')).toEqual('Juliane.Schulze@gmail.com');
                expect(element(by.model('account.data.account.username')).getAttribute('value')).toEqual('customer0');
                expect(element(by.model('account.data.account.username')).isEnabled()).toEqual(false);
                expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Juliane Schulze\n(customer0)');
            });
        });

        describe('update', () => {
            it('should succesfully update', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('My Account')).click();
                browser.sleep(250);
                element(by.model('account.data.account.firstname')).clear().then(() => {
                    element(by.model('account.data.account.firstname')).sendKeys('Neu').sendKeys(protractor.Key.ENTER);
                });
                element(by.model('account.data.account.email')).clear().then(() => {
                    element(by.model('account.data.account.email')).sendKeys('juliane.schmitz@gmail.com').sendKeys(protractor.Key.ENTER);
                });
                element(by.buttonText('Update')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Account successfully updated.\n×");
                expect(element(by.model('account.data.account.firstname')).getAttribute('value')).toEqual('Neu');
                expect(element(by.model('account.data.account.lastname')).getAttribute('value')).toEqual('Schulze');
                expect(element(by.model('account.data.account.email')).getAttribute('value')).toEqual('juliane.schmitz@gmail.com');
                expect(element(by.model('account.data.account.username')).getAttribute('value')).toEqual('customer0');
                expect(element(by.model('account.data.account.username')).isEnabled()).toEqual(false);
                expect(element.all(by.css('.menu-item-username')).get(0).getText()).toBe('Neu Schulze\n(customer0)');
                element(by.model('account.data.account.firstname')).clear().then(() => {
                    element(by.model('account.data.account.firstname')).sendKeys('Juliane').sendKeys(protractor.Key.ENTER);
                });
                element(by.buttonText('Update')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Account successfully updated.\n×");
                expect(element(by.model('account.data.account.firstname')).getAttribute('value')).toEqual('Juliane');
                expect(element(by.model('account.data.account.lastname')).getAttribute('value')).toEqual('Schulze');
            });
        });
    });

    describe('Credit card', () => {

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        describe('view', () => {
            it('should be one credit card', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //Repeater
                let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                expect(creditCards.count()).toBe(1);
                expect(creditCards.get(0).getText()).toContain('5404000000000001 Mastercard');
            });
        });

        describe('add', () => {
            it('should be successfully', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //link
                element(by.buttonText('Add')).click();
                browser.sleep(250);
                //Fill form
                element(by.model('creditCard.data.creditCard.number')).sendKeys('5404000000000033');
                element(by.model('creditCard.data.creditCard.type')).sendKeys('Mastercard');
                element(by.model('creditCard.data.creditCard.cvv')).sendKeys('999');
                HelperFunctions.selectDropDown(element(by.model('creditCard.data.creditCard.month')), 2);
                HelperFunctions.selectDropDown(element(by.model('creditCard.data.creditCard.year')), 2);

                browser.sleep(250);
                //Submit form
                element(by.buttonText('Save')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Credit card successfully created.\n×");
            });
        });

        describe('verify add', () => {
            it('should be two creditcards', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //Repeater
                let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                expect(creditCards.count()).toBe(2);
                expect(creditCards.get(1).getText()).toContain('5404000000000033 Mastercard');
            });
        });

        describe('delete', () => {
            it('should be successfully', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //link
                element(by.buttonText('Remove')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Credit card successfully deleted.\n×");
            });
        });

        describe('verify delete', () => {
            it('should be one credit card', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //Repeater
                let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                expect(creditCards.count()).toBe(1);
            });
        });

        describe('update', () => {
            it('should be successfully', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //Repeater
                element.all(by.repeater('creditCard in creditCards.data.creditCards')).then((cc) => {
                    cc[0].element(by.linkText('Edit')).click();
                });
                element(by.model('creditCard.data.creditCard.number')).clear();
                element(by.model('creditCard.data.creditCard.number')).sendKeys('5404000000000666');
                browser.sleep(250);
                //Submit form
                element(by.buttonText('Update')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Credit card successfully updated.\n×");
            });
        });

        describe('verify update', () => {
            it('should have edited creditcard', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Credit Cards')).click();
                browser.sleep(250);
                //Repeater
                let creditCards = element.all(by.repeater('creditCard in creditCards.data.creditCards'));
                expect(creditCards.count()).toBe(1);
                expect(creditCards.get(0).getText()).toContain('5404000000000666 Mastercard');
            });
        });
    });

    describe('Delivery Address', () => {

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        describe('view', () => {
            it('should be one delivery address', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
                //Repeater
                let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                expect(deliveryAddresses.count()).toBe(1);
                expect(deliveryAddresses.get(0).getText()).toContain('Street:Im Sandbüel 93\nZip:1700\nCity:Fribourg\nCountry:Schweiz\n');
            });
        });

        describe('add', () => {
            it('should success', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
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
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Delivery address successfully created.\n×");
            });
        });

        describe('verify add', () => {
            it('should be two creditcards', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
                //Repeater
                let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                expect(deliveryAddresses.count()).toBe(2);
                expect(deliveryAddresses.get(1).getText()).toContain('Street:Bahnhofstrasse 52\nZip:9001\nCity:Bern\nCountry:Schweiz\n');
            });
        });

        describe('delete', () => {
            it('should success', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
                //link
                element(by.buttonText('Remove')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Delivery address successfully deleted.\n×");
            });
        });

        describe('verify delete', () => {
            it('should be one credit card', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
                //Repeater
                let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                expect(deliveryAddresses.count()).toBe(1);
            });
        });

        describe('update', () => {
            it('should be successfully', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
                //Repeater
                element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses')).then((address) => {
                    address[0].element(by.linkText('Edit')).click();
                });
                element(by.model('deliveryAddress.data.deliveryAddress.street')).clear();
                element(by.model('deliveryAddress.data.deliveryAddress.zip')).clear();
                element(by.model('deliveryAddress.data.deliveryAddress.city')).clear();
                element(by.model('deliveryAddress.data.deliveryAddress.country')).clear();
                element(by.model('deliveryAddress.data.deliveryAddress.street')).sendKeys('Promenade 138');
                element(by.model('deliveryAddress.data.deliveryAddress.zip')).sendKeys('7260');
                element(by.model('deliveryAddress.data.deliveryAddress.city')).sendKeys('Davos');
                element(by.model('deliveryAddress.data.deliveryAddress.country')).sendKeys('Schweiz');
                browser.sleep(250);
                //Submit form
                element(by.buttonText('Update')).click();
                browser.sleep(250);
                expect(element.all(by.className('alert-success')).last().getText()).toBe("Success: Delivery address successfully updated.\n×");
            });
        });

        describe('verify update', () => {
            it('should have edited delivery address', () => {
                //Open Auth Menu
                element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
                browser.sleep(250);
                //Link
                element(by.linkText('Delivery Addresses')).click();
                browser.sleep(250);
                //Repeater
                let deliveryAddresses = element.all(by.repeater('deliveryAddress in deliveryAddresses.data.deliveryAddresses'));
                expect(deliveryAddresses.count()).toBe(1);
                expect(deliveryAddresses.get(0).getText()).toContain('Street:Promenade 138\nZip:7260\nCity:Davos\nCountry:Schweiz\n');
            });
        });
    });
});
