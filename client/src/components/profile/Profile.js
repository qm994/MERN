import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WithSpinner } from '../spinner/spinner';
import { getProfileById } from '../../redux/profile/profile.actions';

const Profile = ({
    match,
    getProfileById,
    profile: { profile, loading },
    auth
}) => {
    console.log(match.params.id)
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById]);

    return (
        <Fragment>
            {
                profile === null && loading 
                ? <WithSpinner loading={loading} />
                : <Fragment>
                    <Link to='/profiles' className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {
                        auth.isAuthenticated && !auth.loading && auth.user._id === match.params.id
                        && (<Link to='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                        </Link>)
                    }
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
