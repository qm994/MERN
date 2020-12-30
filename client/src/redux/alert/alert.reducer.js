import { AlertActionTypes } from './alert.types';

// inital values used when app initialied
const INITIAL_STATE = [];
const alertReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case AlertActionTypes.SET_ALERT:
            return [...state, action.payload]
        case AlertActionTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
        default:
            return state;
    }
};

export default alertReducer;