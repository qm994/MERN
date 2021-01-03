import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { addLike, removeLike, deletePost } from '../../redux/post/post.actions';

const PostItem = ({
    auth,
    post: {
        _id, text, name, avatar, user, likes, comments, date
    },
    addLike, removeLike, deletePost
 }) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                        className="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                <button type="button" className="btn btn-light" onClick={() => addLike(_id)}>
                    <i className="fas fa-thumbs-up"></i>{' '}
                    { likes.length > 0 && <span className='comment-count'>{likes.length}</span> }
                </button>
                <button type="button" className="btn btn-light" onClick={() => removeLike(_id)}>
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion { comments.length > 0 && <span className='comment-count'>{comments.length}</span> }
                </Link>
                {!auth.loading && user === auth.user._id && (
                    <button type="button" className="btn btn-danger" onClick={() => deletePost(_id)}>
                        <i className="fas fa-times"></i>
                    </button>)
                }
            </div>
        </div>
    )
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
