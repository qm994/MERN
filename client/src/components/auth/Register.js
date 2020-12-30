import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/alert/alert.actions';
import PropTypes from 'prop-types'


const Register = ({ setAlert, ...otherProps }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formData;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('password dont match!', 'danger')
        };
        console.log(formData)
    };

    return (
        <Fragment>
            <div>
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value={name} 
                            onChange={handleChange}
                            required />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            value={password2}
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? 
                    <Link to="/login">Sign In</Link>
                </p>
            </div>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType))
});

export default connect(null, mapDispatchToProps)(Register);