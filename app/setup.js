'use strict';
// Declaring the config files to be used in application
var express = require('express'),
    ejs = require('ejs');

module.exports = function (app) {

    //Use html as the default view template
    app.set('view engine', 'html');

    // Initialize the ejs template engine
    app.engine('html', ejs.renderFile);

    // Tell express where it can find the templates
    app.set('views', __dirname + './views');

    // Make the files in the public folder available to the world
    app.use(express.static(__dirname + './public'));

};
