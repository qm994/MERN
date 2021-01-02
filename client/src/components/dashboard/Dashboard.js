import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/profile/profile.actions';
import { WithSpinner } from '../spinner/spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
// Main dashboard component
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
            ? <Fragment>
                <DashboardActions />
                <Experience />
                <Education /> 
            </Fragment>
            : <Fragment>
                <p>You havent set up the profile! Please add some info first</p>
                <Link to='create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </Fragment> 
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
