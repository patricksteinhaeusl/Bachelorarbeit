'use strict';

exports.login = (browser, username, password) => {
    browser.get(browser.params.webshop + '/').then(() => {
        //Open Auth Menu
        browser.element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
        browser.sleep(250);
        //Fill form
        browser.element.all(by.model('auth.data.login.user.username')).get(1).sendKeys(username);
        browser.element.all(by.model('auth.data.login.user.password')).get(1).sendKeys(password);
        //Submit form
        browser.element.all(by.buttonText('Login')).get(1).click();
        browser.sleep(250);
    });
};

exports.logout = (browser) => {
    browser.get(browser.params.webshop + '/').then(() => {
        //Open Auth Menu
        browser.element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
        browser.sleep(250);
        //Submit form
        browser.sleep(250);
        browser.element.all(by.buttonText('Logout')).get(1).click();
        browser.sleep(250);
    });
};

exports.selectDropDown = (element, optionNumber) => {
    element.all(by.tagName('option')).then((options) => {
        options[optionNumber].click();
    });
};
