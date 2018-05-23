'use strict';

const HelperFunctions = require('../helperFunctions.js');
const WebSocket = require('ws');
const cookies = require('cookie');

describe('CSWSH', () => {

    let firstBrowser = browser;
    let secondBrowser = browser.forkNewDriverInstance();
    let cookie;
    let messageFromUser = 'Hello my friend';
    let socketMessage = '"sendMsg",{"msg":"Hello my friend","from":"customer1"}';
    let connected = "connect event did not trigger";
    let event = null;
    let messages = [];
    let expectedResult = "customer1 says: Hello my friend";

    beforeAll((done) => {
        HelperFunctions.login(firstBrowser, 'customer1', 'compass1');
        HelperFunctions.login(secondBrowser, 'customer0', 'compass0');
        cookie = secondBrowser.manage().getCookie('chatUser');
        cookie.then((socketCookie) => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            let socket = new WebSocket(
                browser.params.webshop.toString().replace("https://", "wss://") + "/socket.io/?EIO=3&transport=websocket",
                [],
                {
                    'headers': {
                        'Cookie': cookies.serialize('chatUser', socketCookie.value)
                    }
                }
            );
            socket.onopen = function() {
                connected = "connect event did happen";
                done();
            };
            socket.onmessage = function(msgEvent) {
                messages.push(msgEvent.data);
                if (msgEvent.data.toString().indexOf(socketMessage) > -1) {
                    socket.close();
                }
                done();
            };
            socket.onerror = function(errEvent) {
                event = errEvent;
                done();
            };
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        });
    });

    afterAll(() => {
        HelperFunctions.logout(firstBrowser);
        HelperFunctions.logout(secondBrowser);
    });

    it("should be able to connect to websocket", () => {
        if (event !== null) {
            fail(event)
        }
        expect(connected).toBe("connect event did happen");
    });

    it("should be able to send and receive", () => {
        firstBrowser.element(by.id('chat-button')).click();
        firstBrowser.sleep(250);
        firstBrowser.element.all(by.repeater('user in websocket.userList')).then((user) => {
            user[0].click();
            firstBrowser.element(by.model('websocket.message')).sendKeys(messageFromUser);
            firstBrowser.element(by.buttonText('Send...')).click();
        });
        secondBrowser.element(by.id('chat-button')).click();
        secondBrowser.sleep(250);
        expect(secondBrowser.element.all(by.css('.message-container')).get(0).getText()).toBe(expectedResult);
    });

    it("should be able to eavesdrop socket", () => {
        expect(messages.toString()).toContain(socketMessage);
    });
});
