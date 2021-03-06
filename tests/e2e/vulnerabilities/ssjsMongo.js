'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('SSJS MongoDB', () => {
    let result;
    let searchValue = {searchValue: "';sleep(1200);'"};
    let start;
    let time;

    beforeAll((done) => {
        start = new Date();
        result = HelperFunctions.httpRequest(browser.params.webshop +'/api/faq/searchValue/', searchValue, true).then((result) => {
            done();
            return result;
        });
    });

    it('should wait for > 6 seconds for response', () => {
        time = new Date() - start;
        result.then(() => {
            time = new Date() - start;
            expect(time>6000).toBe(true);
        });

    });

    it('should return 404', () => {
        result.then((text) => {
            expect(text.statusCode).toBe(404);
        });
    });

    it('should return empty array', () => {
        result.then((text) => {
            text = JSON.parse(text.bodyString);
            expect(text.data).toBe(null);
        });
    });
});
