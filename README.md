# flare-server
This is the server side component for the flares android app.

The specification for the Rest Api which will be provided.
    Route                      HTTP Verb         Description
    /api/games                  GET            Get all the games.
    /api/games/:game_id       GET              Get a single game details.
    /api/search/:name           GET            Search for specific game etc.


    /api/games                  GET            Get all the games.
        The query parameters -
            FieldName   Description
            count       specify the count of games to return 10 if not specified max is 100
            offset      the number from which to start data in pagination default is 0
            sortfield   the field to sort the game list default is name
                        Expected values - rating, release date, name

        Expected output -
            Field                Description
            total                total number of games available
            link
              - self             link to this data segment with same parameters
              - next             link for next set of data with same parameters
              - prev             link to prev data segment with same parameters
            games
              - game
                 - id            id of the game
                 - name          name of the game
                 - logo          url for logo for the game
                    - small
                    - medium
                    - large
                 - ratings
                    -metacritic  metacritic ratings for game
                 - released      release date or year

    /api/games/:game_id       GET            Get a single game details.
        Expected output -
                Field            Description
                game
                 - id            id of the game
                 - name          name of the game
                 - logo          logo for the game
                 - ratings       Various kind ratings list
                    -metacritic   metacritic ratings for game
                 - release date   release date or year
                 - studio         developing studio
                 - genre          the genre for gaming
                 - platforms      the platforms game is available
                 - links          list of links related to game

    /api/search/:name           GET            Search for the game details.
        Takes any related string on the game like word from name with parameters
        Should be able to support fuzzy search on the game names

        The query parameters-
            can have key value pairs for sorting.

        Expected output -
            Field                Description
            total                total number of games with search criteria
            sent                 The number of suggestions sent
            link
              - self             link to this data segment with same parameters
              - next             link for next set of data with same parameters
              - prev             link to prev data segment with same parameters
            games
              - game
                 - id            id of the game
                 - name          name of the game
                 - logo          url for logo for the game
                    - small
                    - medium
                    - large
                 - ratings
                    -metacritic  metacritic ratings for game
                 - released      release date or year