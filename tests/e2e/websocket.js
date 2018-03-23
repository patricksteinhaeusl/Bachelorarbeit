'use strict';

const HelperFunctions = require('./helperFunctions.js');

let firstBrowser = browser;
let secondBrowser = browser.forkNewDriverInstance();

describe('Websocket', function () {

    describe('Chat before authentication', function () {
        it('should be hidden', function () {
            firstBrowser.get('http://localhost:3000/').then(function () {
                expect(firstBrowser.element(by.id('chat-button')).isPresent()).toBe(false);
            });
        });
    });

    describe('Chat after authentication', function () {

        beforeAll(function () {
            HelperFunctions.login(firstBrowser, 'customer0', 'compass0');
            HelperFunctions.login(secondBrowser, 'customer1', 'compass1');
        });

        afterAll(function () {
            HelperFunctions.logout(firstBrowser);
            HelperFunctions.logout(secondBrowser);
        });

        it('should be visible', function () {
            firstBrowser.get('http://localhost:3000/').then(function () {
                expect(firstBrowser.element(by.id('chat-button')).isDisplayed()).toBe(true);
            });
        });

        it('should send and receive', function () {
            firstBrowser.get('http://localhost:3000/').then(function () {
                firstBrowser.element(by.id('chat-button')).click();
                firstBrowser.sleep(250);
                expect(firstBrowser.element.all(by.css('.chat')).get(0).isDisplayed()).toBe(true);
                firstBrowser.element.all(by.repeater('user in websocket.userList')).then(function(user) {
                    user[0].click();
                    firstBrowser.element(by.model('websocket.message')).sendKeys('Hallo wie geht es dir?');
                    firstBrowser.element(by.buttonText('Send...')).click();
                    secondBrowser.sleep(1000);
                    secondBrowser.element(by.id('chat-button')).click();
                    secondBrowser.sleep(250);
                    let expectedResult = "customer0 says: Hallo wie geht es dir?";
                    expect(secondBrowser.element.all(by.css('.message-container')).get(0).getText()).toBe(expectedResult);
                });
            });
        });
    });
});
