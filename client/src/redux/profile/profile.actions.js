import { ProfileActionTypes } from './profile.types';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
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
            dispatch(setAlert(error.response.data.msg, 'danger', 3000));
        }
    }
};

