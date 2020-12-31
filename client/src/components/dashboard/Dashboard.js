import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/profile/profile.actions';
import { WithSpinner } from '../spinner/spinner';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading} }) => {

    useEffect(() => {
        getCurrentProfile()
    }, []);
    return loading && profile == null 
    ? <WithSpinner loading />
    :
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i class="fas fa-user"></i> Welcome {user && user.name}
        </p>
        { profile !== null
            ? <Fragment>has</Fragment>
            : <Fragment>not</Fragment> 
        };
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
