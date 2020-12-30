import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { setAlert } from '../../redux/alert/alert.actions';
import { login } from '../../redux/auth/auth.actions';


const Register = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        login(email, password);
    };

    // if login redirect
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    };
    
    return (
        <Fragment>
            <div>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Login Your Account</p>
                <form className="form" onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <small className="form-text"
                            >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                            >
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            value={email} 
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Dont have an account? 
                    <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </Fragment>
    )
};

login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
