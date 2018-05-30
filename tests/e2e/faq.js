'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('FAQ', () => {
    beforeAll(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        element(by.linkText('FAQ')).click();
    });

    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    describe('Searching', () => {
        it('should return correct amount of questions/answers for "chat"', () => {
            //Fill out Input
            element(by.model('faq.data.searchValue')).clear().then(() => {
                element(by.model('faq.data.searchValue')).sendKeys('chat').sendKeys(protractor.Key.ENTER);
            });
            expect(element.all(by.repeater('faq in faq.data.FaqQuestions')).count()).toBe(2);
        });

        it('should return error if something goes wrong', () => {
            //Fill out Input
            element(by.model('faq.data.searchValue')).clear().then(() => {
                element(by.model('faq.data.searchValue')).sendKeys(');').sendKeys(protractor.Key.ENTER);
            });
            expect(element.all(by.className('alert-danger')).last().getText()).toBe("Error: Could not process your input.\n×");
            expect(element(by.className('faqNotFound')).isDisplayed()).toBe(true);
        });

        it('should say that nothing can be found if nothing can be found', () => {
            //Fill out Input
            element(by.model('faq.data.searchValue')).clear().then(() => {
                element(by.model('faq.data.searchValue')).sendKeys('chat').sendKeys(protractor.Key.ENTER);
            });
            expect(element(by.className('faqNotFound')).isDisplayed()).toBe(false);
            //Fill out Input
            element(by.model('faq.data.searchValue')).clear().then(() => {
                element(by.model('faq.data.searchValue')).sendKeys('adadasdadsfwdarefwdas').sendKeys(protractor.Key.ENTER);
            });
            expect(element(by.className('faqNotFound')).isDisplayed()).toBe(true);
        });
    });

    describe('Clear Search Form', () => {
        it('should return all questions/answers', () => {
            element(by.model('faq.data.searchValue')).clear().sendKeys(protractor.Key.ENTER).then(() => {
                let countedQuestions =element.all(by.repeater('faq in faq.data.FaqQuestions')).count();
                element(by.model('faq.data.searchValue')).sendKeys('chat').sendKeys(protractor.Key.ENTER);
                element(by.model('faq.data.searchValue')).clear().then(() => {
                    element(by.model('faq.data.searchValue')).sendKeys(protractor.Key.ENTER);
                    expect(element.all(by.repeater('faq in faq.data.FaqQuestions')).count()).toBe(countedQuestions);
                });
            });

        });
    });
});
