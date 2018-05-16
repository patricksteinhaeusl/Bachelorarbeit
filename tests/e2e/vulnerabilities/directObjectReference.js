'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('Direct Object Reference', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    it('other creditcard should be accessable', function () {
        element(by.linkText('Credit Cards')).click();
        element.all(by.repeater('creditCard in creditCards.data.creditCards')).then(function (creditCards) {
            let CCNUmber = element(by.binding('creditCard.number')).getText().then(function (number) {
                return parseInt(number);
            });
            creditCards[0].element(by.linkText('Edit')).click();
            expect(browser.getCurrentUrl()).toContain(CCNUmber);
            let value = element(by.model('creditCard.data.creditCard.number')).getAttribute('value').then(function (value) {
                return (parseInt(value));
            });
            expect(value).toBe(CCNUmber);
        });
    });

    it('other creditcard should be accessable', function () {
        let directAccessedCC = 5404000000000003;
        browser.get(browser.params.webshop + '/#!/creditcard/' + directAccessedCC).then(function () {
            expect(browser.getCurrentUrl()).toContain(directAccessedCC);
            let value = element(by.model('creditCard.data.creditCard.number')).getAttribute('value').then(function (value) {
                return (parseInt(value));
            });
            expect(value).toBe(directAccessedCC);
        });
    });
});
