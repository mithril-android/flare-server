'use strict';
var winston = require('winston'),
    config = require('./config');

var logger = new(winston.Logger)({
    transports: [
      new winston.transports.File({
            filename: config.logger.path,
            level: config.logger.levels
        })
    ],
    exceptionHandlers: [
      new winston.transports.File({
            filename: config.logger.exception
        })
    ]
});

var customLogger = function (message, level) {
    level = level || 'info';

    logger.log(level, 'pid: [%d] - %s', process.pid, message);
};

console.log('logging');
module.exports = customLogger;
