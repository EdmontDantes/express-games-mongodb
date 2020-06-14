const games = require('../models/Games');
const snarky = require('../middlewares/snarky');
// change all route names not to use capital letters
// /allgames

// /singelgame
// /creategame
// /updategame
// /deletegame
//allgames, singlegame, creategame, updategame, deletegame, enter, noentry


module.exports = {
//GetAllGames Get request not working yet 404
    allgames: (req, res) => {
        games
            .find()
            .then((game) => {
                return res.status(200).json(game)
            })
            .catch(err => console.log(err));
    },


    //GetSingleGame GET request not working yet 404 
    singlegame: (req, res) => {
        games
            .findOne({ _id: req.params.id })
            .then((game) => {
                if(game) {
                    return res
                            .status(200)
                            .json(game);
                } else {
                    return res
                            .status(404)
                            .json({ message: 'Game not Found searched by id' });
                }
            })
            .catch((error) => console.log('Server Error', error));
    },
    



// //CreateGame POST request

    creategame: (req, res) => {
        //require secret and name along with other things
        games
            .findOne({ name: req.body.name })
            .then((game) => {
                if(game) {
                    return res
                            .status(200)
                            .json({ message: 'Game already exists', game});
                }

                let newGame = new games();

                newGame.name = req.body.name;
                newGame.description = req.body.description;
                newGame.released = req.body.released;
                newGame.playtime = req.body.playtime;
                newGame.secret = req.body.secret;
                
                
                newGame
                        .save()
                        .then((game) => {
                            return res
                                    .status(200)
                                    .json({ message: 'Game Successfully created in database', game});
                        })
                        .catch((error) => {
                            return res
                                    .status(404)
                                    .json({ message: 'Something went wrong you game didn\'t save into database', error });
                        })
            })
            .catch((error) => {
                res
                    .status(500)
                    .json({ message: 'Server Error', error})
            })
    },

    updategame: (req, res) => {
        //require secret and name for this
        games
            .findOne({ name: req.body.name})
            .then((game) => {
                if(game) {
                    if(game.secret === req.body.secret) {
                        let updatedGame = req.body;

                        game.name = updatedGame.name ? updatedGame.name : game.name;
                        game.description = updatedGame.description ? updatedGame.description : game.description;
                        game.released = updatedGame.released ? updatedGame.released : game.released;
                        game.playtime = updatedGame.playtime ? updatedGame.playtime : game.playtime;
                        
                        return res
                                .status(200)
                                .json( { message: 'Successfully updated Your game data', game});
                    } else {
                        return res
                                .status(500)
                                .json( { message: 'Please provide game name and secret in order to update a game' });
                    }
                }
            })
            .catch((error) => {
                res
                    .status(404)
                    .json({ message: 'Server Error cannot update game', error});
            });
    },

    deletegame: (req, res) => {
        let id = req.params.id;
        let secret = req.params.secret;
        games
            .findByIdAndDelete(id)
            .then((game) => {
                if(game.secret === secret) {
                    return res
                            .status(200)
                            .json({ message: 'Based on your input of id and secret the api was able to delete your game from database'});
                } else {
                    return res
                            .status(500)
                            .json({ message: 'Sorry wrong information give in the parameters of your query'});
                }
            })
            .catch((error) => {
                return res
                        .status(404)
                        .json({ message: 'Server Error delete game is not possible, something gone awry', error});
            });
    },
// NEW GET ROUTES:
// /enter
// /enter
// /noentry
    enter: (req, res) => {
        games
        .findOne({ name: req.body.name })
        .then((game) => {
            if(game) {
                if(game.secret === req.body.secret) {
                    return res
                                .status(200)
                                .json({ message: `You have inputted correct information matching the data existed, Welcome here is your game data and your game name is ${game.name}`, snarky });
                } else {
                    return res
                                .redirect('/api/v1/games/noentry');
                }
            } else {
                return res
                            .status(404)
                            .json({ message: 'Game not Found'});
            }   
        })
        .catch((error) => {
            return res
                    .status(404)
                    .json({ message: 'Server Error Enter is not working, please make sure all the fields are inputted correctly'});
        });
    }, 

    noentry: (req, res) => {
        return res
                .status(200)
                .json({message: 'You will have to enter the correct secret to enter'})
    }


};