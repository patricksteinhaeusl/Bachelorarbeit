'use strict';

const HelperFunctions = require('./helperFunctions.js');

describe('Websocket', () => {

    let firstBrowser = browser;
    let secondBrowser = browser.forkNewDriverInstance();

    describe('Chat before authentication', () => {
        it('should be hidden', () => {
            firstBrowser.get(browser.params.webshop).then(() => {
                expect(firstBrowser.element(by.id('chat-button')).isPresent()).toBe(false);
            });
        });
    });

    describe('Chat after authentication', () => {

        beforeAll(() => {
            HelperFunctions.login(firstBrowser, 'customer0', 'compass0');
            HelperFunctions.login(secondBrowser, 'customer1', 'compass1');
        });

        afterAll(() => {
            HelperFunctions.logout(firstBrowser);
            HelperFunctions.logout(secondBrowser);
        });

        beforeEach(() => {
            firstBrowser.get(browser.params.webshop);
        });

        it('should be visible', () => {
            expect(firstBrowser.element(by.id('chat-button')).isDisplayed()).toBe(true);
        });

        it('should send and receive', () => {
            firstBrowser.element(by.id('chat-button')).click();
            firstBrowser.sleep(250);
            expect(firstBrowser.element.all(by.css('.chat')).get(0).isDisplayed()).toBe(true);
            firstBrowser.element.all(by.repeater('user in websocket.userList')).then((user) => {
                user[0].click();
                firstBrowser.element(by.model('websocket.message')).sendKeys('Hallo wie geht es dir?');
                firstBrowser.element(by.buttonText('Send...')).click();
                secondBrowser.element(by.id('chat-button')).click();
                let expectedResult = "customer0 says: Hallo wie geht es dir?";
                secondBrowser.sleep(2000);
                expect(secondBrowser.element.all(by.css('.message-container')).get(0).getText()).toBe(expectedResult);
            });
        });
    });
});
