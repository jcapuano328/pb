import { createSelector } from 'reselect';
import getGame from './game';

const getTurn = (state) => state.current.turn;
const getCup = (state) => state.current.command.cup || [];
const getCurrent = (state) => state.current.command.chits || [];
const getDelay = (state) => state.current.command.delay;
const getPool = (state) => state.current.command.pool || [];


export default createSelector(
    [getGame, getPool, getTurn, getCup, getCurrent, getDelay],
    (game,pool,turn,cup,current,delay) => {       
        let chits = (pool && pool.length > 0) ? pool : game.command.chits;
        return chits.filter((c) => 
            turn >= c.turn
            //&& !cup.find((cc) => cc.side === c.side && cc.code === c.code)
            && !current.find((cc) => cc.side === c.side && cc.code === c.code)
            && (delay == null || delay.side !== c.side || delay.code !== c.code)
        );
    }    
);
