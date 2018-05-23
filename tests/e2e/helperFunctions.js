'use strict';
const urlParse = require("url");

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

exports.registerUser = (firstname, lastname, password) => {
    browser.get(browser.params.webshop + '/').then(() => {
        //Open Auth Menu
        element.all(by.css('.glyphicon.glyphicon-user')).get(0).click();
        browser.sleep(250);
        if (element.all(by.buttonText('Logout')).isDisplayed()) {
            element.all(by.buttonText('Logout')).click()
        }
        //Link
        element(by.linkText('Register')).click();
        //Fill form
        element(by.model('auth.data.register.account.firstname')).sendKeys(firstname);
        element(by.model('auth.data.register.account.lastname')).sendKeys(lastname);
        element(by.model('auth.data.register.account.email')).sendKeys(firstname+"."+lastname+"@gmail.com");
        element(by.model('auth.data.register.account.username')).sendKeys(firstname+"_"+lastname);
        element(by.model('auth.data.register.account.password')).sendKeys(password);
        //Submit form
        element(by.buttonText('Register')).click();
        browser.sleep(250);
    });
};

exports.httpRequest = (siteUrl, postData, isJSON, Method) => {
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
    if (Method) {
        options.method = Method;
    }
    if (isJSON) {
        postData = JSON.stringify(postData);
        options.method = 'POST';
        options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        };
    }

    if (parsedURL.protocol === "https:") {
        req = https.request(options, (response) => handleRequest(response, defer))
            .on('error', (e) => {
                defer.reject("Got http.get error: " + e.message);
            });
    } else {
        req = http.request(options, (response) => handleRequest(response, defer))
            .on('error', (e) => {
                defer.reject("Got https.get error: " + e.message);
            });
    }

    if (isJSON) {
        req.write(postData);
    }
    req.end();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    return defer.promise;
};


exports.searchBrowserConsole = (searchValue, callback) => {
    browser.sleep(250);
    browser.manage().logs().get('browser').then((browserLog) => {
        require('util').inspect(browserLog);
        let found = false;
        browserLog.forEach((entry) => {
            if(entry.message.indexOf(searchValue) > -1) {
                found = true;
            }
        });
        return callback(found);
    });
};

function handleRequest(response, defer) {
    let bodyString = '';

    response.setEncoding('utf8');

    response.on("data", (chunk) => {
        bodyString += chunk;
    });

    response.on('end', () => {
        defer.fulfill({
            statusCode: response.statusCode,
            bodyString: bodyString,
            headers: response.headers
        });
    });
}
