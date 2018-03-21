'use strict';

const fs = require('fs');
const logFile = './logs/log.txt';
const logSocketFile = './logs/socket.txt';

let util = {
    writeInfo: function (message) {
        let logMessage = util.createMessage('Info', message);
        fs.appendFileSync(logFile, logMessage);
        console.info(logMessage);
    },
    writeError: function (message) {
        let logMessage = util.createMessage('Error', message);
        fs.appendFileSync(logFile, logMessage);
        console.error(logMessage);
    },
    writeSocketLog: function (message) {
        let logMessage = message + '\n';
        fs.appendFileSync(logSocketFile, logMessage);
        console.error(logMessage);
    },
    createMessage: function (type, message) {
        return 'Date: ' + new Date() + '\t Type: ' + type + '\t Message: ' + message + '\n';
    }
};

module.exports = util;
