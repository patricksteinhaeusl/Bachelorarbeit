'use strict';
const HelperFunctions = require('../helperFunctions.js');

describe('SSJS MongoDB', function () {
    let result;
    let searchValue = {searchValue: "';sleep(1200);'"};
    let start;
    let time;

    beforeAll(function (done) {
        start = new Date();
        result = HelperFunctions.httpRequest('https://localhost/api/faq/searchValue/', searchValue, true).then(function (result) {
            done();
            return result;
        });
    });

    it('should wait for > 6 seconds for response', function () {
        time = new Date() - start;
        result.then(() => {
            time = new Date() - start;
            expect(time>6000).toBe(true);
        });

    });

    it('should return 200', function () {
        result.then((text) => {
            expect(text.statusCode).toBe(200);
        });
    });

    it('should return empty array', function () {
        result.then((text) => {
            text = JSON.parse(text.bodyString);
            expect(text.data.faq.length).toBe(0);
        });
    });
});
