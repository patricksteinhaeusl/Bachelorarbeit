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
            'browser': 'INFO'
        },
        'chromeOptions': {
            args: ['--window-size=1500,1500','--no-sandbox', '--test-type=browser'],
            prefs: {
                'plugins.always_open_pdf_externally': true,
                'download': {
                    'prompt_for_download': false,
                    'default_directory': __dirname + '/assets/downloads/',
                    'directory_upgrade': true
                }
            }
        },

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
