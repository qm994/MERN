import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import { logout } from '../../redux/auth/auth.actions';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href="#!">
                    <i class="fas fa-signout-alt"></i>{''}
                    <span class="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to='/'>
                        <i className="fas fa-code"></i>
                        DevConnector
                    </Link>
                </h1>
                { !loading && <Fragment>
                    {
                        isAuthenticated
                        ? authLinks
                        : guestLinks
                    }
                </Fragment> }
            </nav>
        </div>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
