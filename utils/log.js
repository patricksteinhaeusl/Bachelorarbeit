'use strict';

const fs = require('fs');
const logFile = './logs/log.txt';

let util = {
    writeInfo: (message) => {
        let logMessage = util.createMessage('Info', message);
        fs.appendFileSync(logFile, logMessage);
        console.info(logMessage);
    },
    writeError: (message) => {
        let logMessage = util.createMessage('Error', message);
        fs.appendFileSync(logFile, logMessage);
        console.error(logMessage);
    },
    createMessage: (type, message) => {
        return 'Date: ' + new Date() + '\t Type: ' + type + '\t Message: ' + message + '\n';
    }
};

module.exports = util;
