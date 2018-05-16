'use strict';
const urlParse = require("url");

exports.login = function (browser, username, password) {
    browser.get(browser.params.webshop + '/').then(function () {
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

exports.logout = function logout(browser) {
    browser.get(browser.params.webshop + '/').then(function () {
        //Open Auth Menu
        browser.element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
        browser.sleep(250);
        //Submit form
        browser.sleep(250);
        browser.element.all(by.buttonText('Logout')).get(1).click();
        browser.sleep(250);
    });
};

exports.selectDropDown = function (element, optionNumber) {
    element.all(by.tagName('option')).then(function (options) {
        options[optionNumber].click();
    });
};

exports.httpRequest = function (siteUrl, postData, isJSON) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let req;
    let https = require('https');
    let http = require('http');
    let defer = protractor.promise.defer();
    let parsedURL = urlParse.parse(siteUrl);
    let options = {
        port: parsedURL.port,
        protocol: parsedURL.protocol,
        host: parsedURL.hostname,
        path: parsedURL.path,
    };

    if (isJSON) {
        postData = JSON.stringify(postData);
        options.method = 'POST';
        options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        };
    }

    if (parsedURL.protocol === "https:") {
        req = https.request(options, function (response) {

            let bodyString = '';

            response.setEncoding('utf8');

            response.on("data", function (chunk) {
                bodyString += chunk;
            });

            response.on('end', function () {
                defer.fulfill({
                    statusCode: response.statusCode,
                    bodyString: bodyString,
                    headers: response.headers
                });
            });
        }).on('error', function (e) {
            defer.reject("Got https.get error: " + e.message);
        });
    } else {
        req = http.request(options, function (response) {

            let bodyString = '';

            response.setEncoding('utf8');

            response.on("data", function (chunk) {
                bodyString += chunk;
            });

            response.on('end', function () {
                defer.fulfill({
                    statusCode: response.statusCode,
                    bodyString: bodyString,
                    headers: response.headers
                });
            });
        }).on('error', function (e) {
            defer.reject("Got http.get error: " + e.message);
        });
    }

    if (isJSON) {
        req.write(postData);
    }
    req.end();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    return defer.promise;
};
