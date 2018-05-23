'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('CORS Access-Control-Allow-Origin: *', () => {
    let result;
    beforeAll((done) => {
        result = HelperFunctions.httpRequest(browser.params.webshop + "/api/product").then((result) => {
            done();
            return result;
        });
    });

    it('should return 200 and correct CORS Header', () => {
        result.then((text) => {
            expect(text.statusCode).toBe(200);
        });
    });

    it('should return correct CORS Header', () => {
        result.then((text) => {
            expect(JSON.stringify(text.headers)).toContain("\"access-control-allow-origin\":\"*\"");
        });
    });
});
