import { createSelector } from 'reselect';
import moment from 'moment';
import getGame from './game';
import TURN_MINS from '../constants/turn';

const getTurn = (state) => state.current.turn;

export default createSelector(
    [getTurn, getGame],
    (turn, game) => {        
        let t = turn;
        if (special = game.turns.some(t => t.includes('Special'))) {
            t--;
        }
        let s = 'Turn ' + t.toString();
        if (turn < game.turns.length) {
            s += ': ' + game.turns[turn-1];
        }

        return s;
    }    
);
