const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./e2e/**/*.js'],
    params: {
        webshop: 'https://localhost'
    },
    capabilities: {
        'browserName': 'chrome',
        'loggingPrefs': {
            'driver': 'INFO',
            'server': 'INFO',
            'browser': 'INFO'
        },
        'acceptInsecureCerts': true,
        'chromeOptions': {
            args: ['--headless','--disable-gpu','--no-sandbox','--window-size=1500,1500'],
        },
    },
    jasmineNodeOpts: {
        //Don't show protractors . output
        print: () => {}
    },
    onPrepare: () => {
        jasmine.getEnv().addReporter(new SpecReporter({
            suite: {
                displayNumber: true,    // display each suite number (hierarchical)
            },
            spec: {
                displayPending: true,   // display each pending spec
                displayDuration: true,  // display each spec duration
                displayStacktrace: false, //display stack trace for failed specs
            },
            summary: {
                displaySuccesses: true, // display summary of all successes after execution
                displayFailed: true,    // display summary of all failures after execution
                displayPending: true,   // display summary of all pending specs after execution
                displayErrorMessages: true, //display error messages next to failed specs
                displayStacktrace: true //display stack trace next to failed specs
            },
        }));
    }
};
