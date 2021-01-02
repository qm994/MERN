import { ProfileActionTypes } from './profile.types';

const INITIAL_STATE = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

const profileReducer = (state=INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        case ProfileActionTypes.GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case ProfileActionTypes.GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case ProfileActionTypes.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ProfileActionTypes.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        // add experience and education
        case ProfileActionTypes.UPDATE_PROFILE_EXPERIENCE:
        case ProfileActionTypes.UPDATE_PROFILE_EDUCATION:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        // Get repos and error
        case ProfileActionTypes.GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case ProfileActionTypes.GET_REPOS_ERROR:
            return {
                ...state,
                repos: [],
                loading: false,
                error: payload
            }
        default:
            return state
    }
};

export default profileReducer;

