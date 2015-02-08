'use strict';
var express = require('express'),
    logger = require('./logger');

module.exports = function (app) {

    // The url to render the index page when a client wants see the ui for the api.
    app.get('/', function (req, res) {
        // Render views/index.html
        res.render('index');
    });


    /*

    The specification for the Rest Api which we are going to use.
    Route                      HTTP Verb         Description
    /api/games                  GET            Get all the games.
    /api/games/:game_name       GET            Get a single game details.
    
    The url /api/games can handle query parameters --
        The query parameters can be accessed by req.query.color for query on color
        count - specify the count of games to return
        sortfield - the field to sort the game list
        
    */

    //Create a router instance for the api to handle all our requests.
    var router = express.Router();
    app.use('/api', router);


    // middleware to use for all requests. All the routes are executed in same order.
    router.use(function (req, res, next) {
        //The placeholder middleware to process all the requests to the api.
        //Later to be replaced by more useful system
        logger('Received a request');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.get('/test', function (req, res) {
        res.json({
            message: 'Testing! welcome to the api!'
        });
    });

    // create accessed at GET http://localhost:8000/api/games)
    router.route('/games')
        .get(function (req, res) {
            // TODO put some data to get on projects
            logger(req + ' ' + res);
        });

    router.route('/games/:game_name')
        .get(function (req, res) {
            // TODO get data for specific project
            logger(req + ' ' + res);
        })
        .post(function (req, res) {
            // TODO create or update data for specific project
            logger(req + ' ' + res);
        });
};
