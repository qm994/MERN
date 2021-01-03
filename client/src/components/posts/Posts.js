import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { getPosts } from '../../redux/post/post.actions';
import { WithSpinner } from '../spinner/spinner';



const Posts = ({
    getPosts,
    post: {
        posts,
        loading
    }
}) => {
    useEffect(() => {
        getPosts()
    }, [getPosts]);

    return (
        <div>
            
        </div>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
