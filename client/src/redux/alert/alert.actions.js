
import { AlertActionTypes } from './alert.types';
import uuid from 'uuid';

export const setAlert = (msg, alertType) => {
    return dispatch => {
        const id = uuid.v4();
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