import { createSelector } from 'reselect';
import getGame from './game';

const getTurn = (state) => state.current.turn;
const getCup = (state) => state.current.command.cup || [];
const getCurrent = (state) => state.current.command.chits || [];
const getDelay = (state) => state.current.command.delay;


export default createSelector(
    [getGame, getTurn, getCup, getCurrent, getDelay],
    (game,turn,cup,current,delay) => {       
        
        return game.command.filter((c) => 
            turn >= c.turn
            //&& !cup.find((cc) => cc.side === c.side && cc.code === c.code)
            && !current.find((cc) => cc.side === c.side && cc.code === c.code)
            && (delay == null || delay.side !== c.side || delay.code !== c.code)
        );
    }    
);
