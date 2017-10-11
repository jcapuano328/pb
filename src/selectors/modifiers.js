import { createSelector } from 'reselect';
import getGame from './game';

export default createSelector(
    [getGame],
    (game) => {        
        if (!game || !game.modifiers) {
            return [];
        }
        return game.modifiers;
    }    
);
