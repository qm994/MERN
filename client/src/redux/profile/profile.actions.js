import { ProfileActionTypes } from './profile.types';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { body } from 'express-validator';
import { set } from 'mongoose';
//import setAuthToken from '../../utils/setAuthToken';

// Get current user profile
export const getCurrentProfile = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('api/profile/me');
            dispatch({
                type: ProfileActionTypes.GET_PROFILE,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ProfileActionTypes.PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            });
        }
    }
};

// Clear profile while logout
export const clearProfile = () => {
    return dispatch => dispatch({
        type: ProfileActionTypes.CLEAR_PROFILE
    });
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            //const body = JSON.stringify(formData);
            const body = formData;
            const res = await axios.post('api/profile', body, config);

            dispatch({
                type: ProfileActionTypes.GET_PROFILE,
                payload: res.data
            });

            dispatch(setAlert(
                edit ? 'Profile Updated!' : 'Profile Created!',
                'success',
                3000
            ));
            history.push('/dashboard');

        } catch (error) {
            dispatch({
                type: ProfileActionTypes.PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            });

            // dispatch the backend validation errors
            const errors = error.response.data.errors;
            if(errors) {
                errors.forEach(
                    error => dispatch(setAlert(error.msg, 'danger',  3000))
                )
            };
        }
    }
};


// Add experience
const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const body = formData;
        const res = await axios.put('api/profile/experience', body, config);

        dispatch({
            type: ProfileActionTypes.UPDATE_PROFILE_EXPERIENCE,
            payload: res.data
        });

        dispatch(setAlert(
            'Experience Added!',
            'success',
            3000
        ));
        history.push('/dashboard');

    } catch (error) {
        dispatch({
            type: ProfileActionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });

        // dispatch the backend validation errors
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(
                error => dispatch(setAlert(error.msg, 'danger',  3000))
            )
        };
    }
};

// Add education
const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const body = formData;
        const res = await axios.put('api/profile/education', body, config);

        dispatch({
            type: ProfileActionTypes.UPDATE_PROFILE_EDUCATION,
            payload: res.data
        });

        dispatch(setAlert(
            'Education Added!',
            'success',
            3000
        ));
        history.push('/dashboard');

    } catch (error) {
        dispatch({
            type: ProfileActionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });

        // dispatch the backend validation errors
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(
                error => dispatch(setAlert(error.msg, 'danger',  3000))
            )
        };
    }
};


