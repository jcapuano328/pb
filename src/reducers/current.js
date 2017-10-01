import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    game: -1,
    turn: 1,
    command: {        
        cup: [],
        delay: null,
        chits: []
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
                ...state.command,
                cup: [...action.value]
            }            
        };

    case types.SET_DELAY:
        return {
            ...state,
            command: {
                ...state.command,
                delay: action.value ? {...action.value} : null
            }            
        };


    case types.SET_CHITS:
        return {
            ...state,
            command: {
                ...state.command,
                chits: [...action.value]
            }            
        };
        
    case types.ADD_CHIT:
        let chits = [...state.command.chits];
        if (action.value.back) {
            chits.push({...action.value.chit});
        } else if (action.value.jump) {
            chits.splice(chits.length > 0 ? chits.length-1 : 0, 0, {...action.value.chit});
        } else {
            chits.shift({...action.value.chit});
        }        
        return {
            ...state,
            command: {
                ...state.command,
                chits: chits
            }            
        };

    case types.REMOVE_CHIT:
        return {
            ...state,
            command: {
                ...state.command,
                chits: state.command.chits.filter((c) => c.side !== action.value.side || c.code !== action.value.code)
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
