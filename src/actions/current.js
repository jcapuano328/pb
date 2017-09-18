import types from '../constants/actionTypes';
import {toast} from './toast';
import Phases from '../services/phases';
import Command from '../services/command';
import getGame from '../selectors/game';

export const reset = (e) => (dispatch,getState) => {
    const game = getGame(getState());
    const {current} = getState();
    e = e || {id: current.game};

    let data = {
        game: e.id,
        turn: 1,
        command: {
            cup: [],
            chit: null
        }
    };
    
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch) => {    
    dispatch({type: types.PREV_TURN});
}
export const nextTurn = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.NEXT_TURN, value: game.turns});
}

export const resetCommandCup = () => (dispatch) => {        
    dispatch({type: types.SET_CUP, value: Command.reset()});
    dispatch({type: types.SET_CHIT, value: null});
}

export const addChitToCup = (chit) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_CUP, value: Command.add(chit,current.command.cup)});
}

export const removeChitFromCup = (chit) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_CUP, value: Command.remove(chit,current.command.cup)});
}

export const drawChitFromCup = (all) => (dispatch,getState) => {        
    const {current} = getState();
    let draw = Command.draw(current.command.cup, all);
    dispatch({type: types.SET_CUP, value: draw.cup});
    dispatch({type: types.SET_CHIT, value: draw.mu});
}

export const setChitCup = (cup) => (dispatch) => {    
    dispatch({type: types.SET_CUP, value: cup});
}

export const setChit = (chit) => (dispatch) => {    
    dispatch({type: types.SET_CHIT, value: chit});
}
