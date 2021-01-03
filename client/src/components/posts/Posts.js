import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../redux/post/post.actions';
import { WithSpinner } from '../spinner/spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';


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
        loading
        ? <WithSpinner loading={loading} />
        : <Fragment>
            <h1 class="large text-primary">Posts</h1>
            <p class="lead">
                <i class="fas fa-user"></i>Welcome to the community!
            </p>
            <PostForm />
            <div class="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
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
