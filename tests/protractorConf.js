let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./e2e/*'],
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--window-size=1000,1000']
        }
    },

    jasmineNodeOpts: {
        //Don't show protractors . output
        print: function() {}
    },
    onPrepare: function () {
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
                displaySuccesses: false, // display summary of all successes after execution
                displayFailed: false,    // display summary of all failures after execution
                displayPending: false,   // display summary of all pending specs after execution
            },
        }));
    }
};