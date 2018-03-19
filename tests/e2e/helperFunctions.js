'use strict';

exports.login = function () {
    //Open Auth Menu
    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
    browser.sleep(250);
    //Fill form
    element.all(by.model('auth.data.login.user.username')).get(1).sendKeys('customer0');
    element.all(by.model('auth.data.login.user.password')).get(1).sendKeys('compass0');
    //Submit form
    element.all(by.buttonText('Login')).get(1).click();
    browser.sleep(250);
};

exports.logout = function logout() {
    //Open Auth Menu
    element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
    browser.sleep(250);
    //Submit form
    browser.sleep(250);
    element.all(by.buttonText('Logout')).get(1).click();
    browser.sleep(250);
};
