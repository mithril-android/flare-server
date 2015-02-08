'use strict';
var winston = require('winston'),
    config = require('./config');

var logger = new(winston.Logger)({
    transports: [
      new winston.transports.File({
            filename: config.logger.path,
            level: config.logger.levels,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
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
