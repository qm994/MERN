
import { AlertActionTypes } from './alert.types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => {
    return dispatch => {
        const id = uuidv4();
        dispatch({
            type: AlertActionTypes.SET_ALERT,
            payload: {msg, alertType, id}
        })
    }
};

export const removeAlert = (alert) => ({
    type: AlertActionTypes.REMOVE_ALERT,
    payload: alert
})