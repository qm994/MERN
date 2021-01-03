import { postActionTypes } from './post.types';

const INITIAL_STATE = {   
    posts: [],
    post: null,
    loading: true,
    error: {}
};
const postReducer = (state=INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        case postActionTypes.GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case postActionTypes.GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case postActionTypes.ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };

        case postActionTypes.POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case postActionTypes.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(
                    post => post._id === payload.id 
                    ? {...post, likes: payload.likes} 
                    : post
                ),
                loading: false
            };
        case postActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            };

        case postActionTypes.ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: payload},
                loading: false
            };
        case postActionTypes.REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload),
                    loading: false
                }
            };
        
        default:
            return state
    }
};

export default postReducer;