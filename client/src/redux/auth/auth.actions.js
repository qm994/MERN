import { AuthActionTypes } from "./auth.types";

import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import setAuthToken from '../../utils/setAuthToken';
import { set } from "mongoose";


// Action will be dispatched when: user login/register
export const loadUser = () => {
    return async(dispatch) => {
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        };
        try {
            const res = await axios.get('api/auth');
            dispatch({
                type: AuthActionTypes.USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: AuthActionTypes.AUTH_ERROR
            });
            error.response.data.errors.forEach(
                error => dispatch(setAlert(error.msg, 'danger', 3000))
            );
        }
    }
}


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
            // register
            const res = await axios.post('api/users', body, config);
            
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
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