import types from '../constants/actionTypes';
import {toast} from './toast';
import Command from '../services/command';
import getGame from '../selectors/game';
import getAvailable from '../selectors/available';

export const reset = (e) => (dispatch,getState) => {
    const game = getGame(getState());
    const {current} = getState();
    e = e || {
        id: current.game, 
        turn: 1, 
        command: {
            chits: game && game.command && game.command.chits ? game.command.chits : [], 
            optional: game && game.command && game.command.optional ? game.command.optional : []
        }
    };
    
    let data = {
        game: e.id,
        turn: e.turn || 1,
        command: {
            cup: [],
            delay: null,
            chits: [],
            pool: e.command.chits || [],
            optional: e.command.optional || []
        }
    };
    data.command.cup = getAvailable({current:data});
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.PREV_TURN, value: 1});
}
export const nextTurn = () => (dispatch,getState) => {    
    const game = getGame(getState());
    const {current} = getState();
    dispatch({type: types.NEXT_TURN, value: game.turns.length});
    if (current.turn < game.turns.length) {
        //resetChitCup()(dispatch,getState);
        dispatch({type: types.SET_CHITS, value: []});
        dispatch({type: types.SET_DELAY, value: null});
        dispatch({type: types.SET_CUP, value: getAvailable(getState())});            
    }
}

export const resetChitCup = () => (dispatch,getState) => {        
    dispatch({type: types.SET_CHITS, value: []});
    dispatch({type: types.SET_DELAY, value: null});
    dispatch({type: types.SET_CUP, value: getAvailable(getState())});    
}

export const addChitToCup = (chit) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_CUP, value: Command.add(chit,current.command.cup)});
}

export const addChitsToCup = (chits) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_CUP, value: Command.add(chits,current.command.cup)});
}

export const removeChitFromCup = (chit) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_CUP, value: Command.remove(chit,current.command.cup)});
}

export const drawChitFromCup = (all) => (dispatch,getState) => {        
    const {current} = getState();
    let draw = Command.draw(current.command.cup, all);
    dispatch({type: types.SET_CUP, value: draw.cup});
    dispatch({type: types.ADD_CHIT, value: {chit: draw.mu, back: true}});
}

export const setChitCup = (cup) => (dispatch) => {    
    dispatch({type: types.SET_CUP, value: cup});
}

export const setChit = (chit) => (dispatch) => {    
    dispatch({type: types.SET_CHIT, value: chit});
}

export const addChitToCurrent = (chit) => (dispatch,getState) => {    
    dispatch({type: types.ADD_CHIT, value: {chit: chit, jump: true}});    
}

export const removeChitFromCurrent = (chit) => (dispatch,getState) => {    
    dispatch({type: types.REMOVE_CHIT, value: chit});    
}

export const addChitToPool = (chit) => (dispatch,getState) => {    
    dispatch({type: types.ADD_CHIT_TO_POOL, value: {chit: chit}});    

    let a = getAvailable(getState());
    if (a.find((c) => c.side === chit.side && c.code === chit.code)) {
        addChitToCup(chit)(dispatch, getState);
        //const {current} = getState();
        //dispatch({type: types.SET_CUP, value: Command.add(chit,current.command.cup)});        
    }
}

export const removeChitFromOptional = (chit) => (dispatch,getState) => {
    dispatch({type: types.REMOVE_CHIT_FROM_OPTIONAL, value: chit});    
}

export const delayCurrentChit = () => (dispatch,getState) => {        
    const {current} = getState();
    let chit = current.command.chits && current.command.chits.length > 0 ? current.command.chits[current.command.chits.length-1] : null;
    if (chit) {
        dispatch({type: types.SET_DELAY, value: chit});
        dispatch({type: types.REMOVE_CHIT, value: chit});    
    }
}

export const returnDelayedChitToCup = () => (dispatch,getState) => {        
    const {current} = getState();
    if (current.command.delay) {
        const {current} = getState();
        dispatch({type: types.SET_CUP, value: Command.add(current.command.delay,current.command.cup)});
        dispatch({type: types.SET_DELAY, value: null});        
    }
}
