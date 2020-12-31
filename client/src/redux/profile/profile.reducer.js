import { ProfileActionTypes } from './profile.types';

const INITIAL_STATE = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    cr: {}
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
        case ProfileActionTypes.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
};

export default profileReducer;

