import { createSelector } from 'reselect';
import Games from '../services/games';

const getGame = (state) => state.current.game;

export default createSelector(
    [getGame],
    (id) => {        
        return Games.game(id);
    }    
);
