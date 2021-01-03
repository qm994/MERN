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

// Add a like
export const addLike = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/posts/like/${postId}`);
            dispatch({
                type: postActionTypes.UPDATE_LIKES,
                payload: { id: postId, likes: res.data }
            });

        } catch (error) {
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

// Remove a like
export const removeLike = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/posts/unlike/${postId}`);
            dispatch({
                type: postActionTypes.UPDATE_LIKES,
                payload: { id: postId, likes: res.data }
            });

        } catch (error) {
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

// Delete a post
export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/posts/${postId}`);
            dispatch({
                type: postActionTypes.DELETE_POST,
                payload: postId
            });
            dispatch(setAlert('Post Removed!', 'success', 3000));

        } catch (error) {
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

// Add a post
export const addPost = (formData) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/api/posts`, formData);
            dispatch({
                type: postActionTypes.ADD_POST,
                payload: res.data
            });
            dispatch(setAlert('Post Created!!', 'success', 3000));

        } catch (error) {
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

//Get post by id
export const getPost = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            dispatch({
                type: postActionTypes.GET_POST,
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

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    
    try {
        const res = await axios.post(
            `/api/posts/comment/${postId}`,
            formData
        );

        dispatch({
            type: postActionTypes.ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: postActionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: postActionTypes.REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: postActionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


