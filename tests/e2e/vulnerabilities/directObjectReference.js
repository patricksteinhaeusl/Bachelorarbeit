'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('Direct Object Reference', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('other creditcard should be accessable', () => {
        element(by.linkText('Credit Cards')).click();
        element.all(by.repeater('creditCard in creditCards.data.creditCards')).then((creditCards) => {
            let CCNUmber = element(by.binding('creditCard.number')).getText().then((number) => {
                return parseInt(number);
            });
            creditCards[0].element(by.linkText('Edit')).click();
            expect(browser.getCurrentUrl()).toContain(CCNUmber);
            element(by.model('creditCard.data.creditCard.number')).getAttribute('value').then((value) => {
                value = (parseInt(value));
                expect(value).toBe(CCNUmber);
            });
        });
    });

    it('other creditcard should be accessable', () => {
        let directAccessedCC = 5404000000000003;
        browser.get(browser.params.webshop + '/#!/creditcard/' + directAccessedCC).then(() => {
            expect(browser.getCurrentUrl()).toContain(directAccessedCC);
            element(by.model('creditCard.data.creditCard.number')).getAttribute('value').then((value) => {
                value = (parseInt(value));
                expect(value).toBe(directAccessedCC);
            });
        });
    });
});
