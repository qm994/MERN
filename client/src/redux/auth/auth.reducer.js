import { AuthActionTypes } from "./auth.types";

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
        case AuthActionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case AuthActionTypes.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state
    }
};

export default authReducer;
