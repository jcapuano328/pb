import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    game: -1,
    turn: 1,
    command: {
        chit: null,
        cup: []
    }
};

const prevTurn = (t) => {    
    if (--t < 1) { t = 1; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t > m) { t = m; }
    return t;    
}

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.current) {
            return {
                ...state,
                ...action.payload.current
            };        	
        }
        return state;

    case types.SET_CURRENT:
        return {
            ...action.value
        };

    case types.SET_CUP:
        return {
            ...state,
            command: {
                ...state.cup,
                cup: [...action.value]
            }            
        };

    case types.SET_CHIT:
        return {
            ...state,
            command: {
                ...state.command,
                chit: {...action.value}
            }            
        };

    case types.PREV_TURN:        
        return {
            ...state,
            turn: prevTurn(state.turn)
        };

    case types.NEXT_TURN:
        return {
            ...state,
            turn: nextTurn(state.turn, action.value)
        };
    
    default:
        return state;
    }
}
