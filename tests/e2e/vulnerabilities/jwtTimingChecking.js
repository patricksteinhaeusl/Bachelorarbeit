'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('JWT Timing Checking', () => {
    afterAll(() => {
        HelperFunctions.logout(browser);
    });

    it('should fail to login as retailer0', () => {
        HelperFunctions.login(browser, 'retailer0', 'SecretRetailer12345');
        expect(element.all(by.className('alert-info')).last().getText()).toMatch('Warning: Username or Password incorrect')
    });

    it('should be able to reach /api site', () => {
        browser.waitForAngularEnabled(false);
        browser.get(browser.params.webshop + "/api").then(() => {
            expect(browser.driver.findElement(by.tagName('h1')).getAttribute('innerText')).toBe("Welcome to the API");
        });
        browser.waitForAngularEnabled(true);
    });

    it('should fail to apply with no token at all', () => {
        browser.waitForAngularEnabled(false);
        browser.get(browser.params.webshop + '/api/retailer/order/5acb4be9d9520729d8638c9a/applyDiscount/').then(() => {
            expect(browser.driver.findElement(by.tagName('pre')).getAttribute('innerText')).toContain("UnauthorizedError");
        });
        browser.waitForAngularEnabled(true);
    });

    it('should fail to apply discount as normal user', (done) => {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        browser.executeScript("return window.localStorage.getItem('token');").then((token)=>{
            token = "Bearer " + token.replace(/"/g , '');
            HelperFunctions.httpRequest(browser.params.webshop + '/api/retailer/order/5acb4be9d9520729d8638c9a/applyDiscount/',null,null,"GET", token).then((result)=>{
                done();
                expect(result.bodyString).toContain("500: Error occurred");
                expect(result.bodyString).toContain("User is not authenticated for this operation!");
            });
        });
    });

    it('should success to apply discount with Bearer Token from site', (done) => {
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1JldGFpbGVyIjp0cnVlLCJfaW" +
            "QiOiI1YWNjODUxZmM4YmMyNjIyMTRjMDFlZTUiLCJ1c2VybmFtZSI6InJldGFpbGVyMCIsImZpcnN0bmFt" +
            "ZSI6IkphY2tvYiIsImxhc3RuYW1lIjoiTcO8bGxlciIsImVtYWlsIjoiSmFja29iLk11ZWxsZXJAZ21haW" +
            "wuY29tIiwiaWF0IjoxNTIzMzU0NjIyLCJhdWQiOiJzZWxmIiwiaXNzIjoid2Vic2hvcCJ9.7eDbsqhJ0jy" +
            "XdKWsjyVgpT5ZL6JIWlBMH8laQ6XYghQ";
        HelperFunctions.httpRequest(browser.params.webshop + '/api/retailer/order/5acb4be9d9520729d8638c9a/applyDiscount/',null,null,"GET", token).then((result)=>{
            done();
            expect(result.bodyString).toContain("Discount successful applied");
            expect(result.bodyString).toContain("Data:");
        });
    });
});
