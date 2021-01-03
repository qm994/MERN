import { postActionTypes } from './post.types';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';

//Get all the posts
export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/posts/');
            dispatch({
                type: postActionTypes.GET_POSTS,
                payload: res.data
            });

        } catch (error) {
            console.log(error)
            dispatch(setAlert('Get all posts failed!', 'danger', 3000));
            dispatch({
                type: postActionTypes.POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            });
        }
    }
};
