import { AuthActionTypes } from "./auth.types";

import axios from 'axios';
import { setAlert } from '../alert/alert.actions';

// Register user
// const register = ({ name, email, password }) => dispatch => {

// }
const register = ({ name, email, password }) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        };

        const body = JSON.stringify({ name, email, password });
        try {
            const res = await axios.post('api/users', body, config);
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Register success!', 'success', 3000));
        } catch (error) {
            const errors = error.response.data.errors;
            if(errors) {
                errors.forEach(
                    error => {
                        dispatch(setAlert(error.msg, 'danger', 3000));
                    }
                );
            };
            dispatch({
                type: AuthActionTypes.REGISTER_FAIL
            });
        }
    };
};

export default register;