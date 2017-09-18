import { createSelector } from 'reselect';
import getGame from './game';

const getCommand = (state) => state.current.command.chit;

export default createSelector(
    [getCommand, getGame],
    (command, game) => {        
        if (!game || !game.commands) {
            return '';
        }
        return game.commands.find((x) => x.code == command.code);
    }    
);
