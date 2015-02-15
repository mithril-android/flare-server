'use strict';
var express = require('express'),
    logger = require('./logger'),
    gamesData = require('./models/games');

module.exports = function (app) {

    // The url to render the index page when a client wants see the ui for the api.
    app.get('/', function (req, res) {
        // Render views/index.html
        res.render('index');
    });


    /*
    The specification for the api which we are going to use
        Route                      HTTP Verb         Description
    /api/games                  GET            Get all the games.
    /api/games/:game_name       GET            Get a single game details.
    /api/search/:name           GET            Search for specific game etc.

    */

    //Create a router instance for the api to handle all our requests.
    var router = express.Router();
    app.use('/api', router);


    // middleware to use for all requests. All the routes are executed in same order.
    router.use(function (req, res, next) {
        //The placeholder middleware to process all the requests to the api.
        //Later to be replaced by more useful system
        /*logger('Received a request');*/
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
            res.send(gamesData);
        });

    router.route('/games/:gameId')
        .get(function (req, res) {
            var done = false;
            var id = req.params.gameId;
            var games = gamesData.games;
            var arrayLength = games.length;
            for (var i = 0; i < arrayLength; i++) {
                if(games[i]._id == id){
                  done = true;
                  res.json(games[i]);
                    break;
                }
            }
            if(!done){
            res.status(404).send('Not found');
            }
        });

    router.route('/search/:name')
        .get(function (req, res) {
            // TODO put some data to get on projects
            logger(req + ' ' + res);
        });

};
