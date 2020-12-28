import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== password2) {
            alert('password dont match!');
            return
        }
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

export default Register;
