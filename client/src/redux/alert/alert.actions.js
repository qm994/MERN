
import { AlertActionTypes } from './alert.types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, timeout=5000) => {
    return dispatch => {
        const id = uuidv4();
        dispatch({
            type: AlertActionTypes.SET_ALERT,
            payload: {msg, alertType, id}
        });

        setTimeout(() => dispatch({
            type: AlertActionTypes.REMOVE_ALERT,
            payload: id
        }), timeout);
    }
};
