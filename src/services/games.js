var games = require('../data/games.json');

module.exports = {
    games: games,
    game(id) {
        return games.find((g) => g.id == id) || {};
    }    
};
