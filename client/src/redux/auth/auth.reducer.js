import { AuthActionTypes } from "./auth.types";
import { ProfileActionTypes } from '../profile/profile.types';
// inital values used when app initialied
const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authReducer = (state=INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        // when register success
        case AuthActionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        // When user authenticated: update user
        case AuthActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        // when register fail
        case AuthActionTypes.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        // when login fail
        case AuthActionTypes.LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case AuthActionTypes.AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        // logout user and clean token
        case AuthActionTypes.LOG_OUT:
        case ProfileActionTypes.DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
};

export default authReducer;
