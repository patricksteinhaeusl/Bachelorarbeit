'use strict';

const fs = require('fs');
const logFile = './logs/log.txt';

let util = {
  writeInfo: function(message) {
    let logMessage = util.createMessage('Info', message);
    fs.appendFile(logFile, logMessage, function(err) {
      if(err) return console.error(err);
      return console.log(message);
    });
  },
  writeError: function(message) {
    let logMessage = util.createMessage('Error', message);
    fs.appendFile(logFile, logMessage, function(err) {
      if(err) return console.error(err);
      return console.error(message);
    });
  },
  createMessage: function(type, message) {
    return 'Date: ' + new Date() + '\t Type: ' + type + '\t Message: ' + message + '\n';
  }
};

module.exports = util;
