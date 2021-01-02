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
export const addExperience = (formData, history) => {
    return async (dispatch) => {
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
    }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
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

//Delete experience

export const deleteExperience = (exp_id) => async (dispatch) => {
    try {
        const res = await axios.delete(`api/profile/experience/${exp_id}`);
        dispatch({
            type: ProfileActionTypes.UPDATE_PROFILE_EXPERIENCE,
            payload: res.data
        });
        dispatch(setAlert(
            'Experience removed!',
            'success',
            3000
        ));
    } catch (error) {
        dispatch({
            type: ProfileActionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

//Delete education

export const deleteEducation = (edu_id) => async (dispatch) => {
    try {
        const res = await axios.delete(`api/profile/education/${edu_id}`);
        dispatch({
            type: ProfileActionTypes.UPDATE_PROFILE_EDUCATION,
            payload: res.data
        });
        dispatch(setAlert(
            'Education removed!',
            'success',
            3000
        ));
    } catch (error) {
        dispatch({
            type: ProfileActionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

//Delete account(user) and profile

export const deleteAccount = () => async (dispatch) => {
    if(window.confirm("Are u sure? This is can NOT be undone!")) {
        try {
            const res = await axios.delete('api/profile');

            dispatch({
                type: ProfileActionTypes.CLEAR_PROFILE
            });

            dispatch({
                type: ProfileActionTypes.DELETE_ACCOUNT
            });
            dispatch(setAlert(
                'Ur account has removed!',
                'success',
                3000
            ));
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




