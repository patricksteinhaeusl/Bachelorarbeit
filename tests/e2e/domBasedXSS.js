'use strict';

describe('DOM Based XSS', function () {
    describe('should throw alert', function () {
        it('should be successfully', function () {
            browser.get(browser.params.webshop + '/#!/shop?selectedQuantity=<script>alert("DomBasedXSS")</script>').then(function () {
                let alertDialog = browser.switchTo().alert();
                expect(alertDialog.getText()).toBe('DomBasedXSS');
                alertDialog.accept();
            });
        });
    });
});
