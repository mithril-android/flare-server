'use strict';
var express = require('express'),
    app = express(),
    logger = require('./logger'),
    config = require('./config');

// Add the required parameters
require('./setup')(app);
require('./routes')(app);

module.exports = app;

var hostname = process.argv[2] || config.ip;
var port = process.env.PORT || config.port;

app.listen(port);
logger('Server running at http://' + hostname + ':' + port);
