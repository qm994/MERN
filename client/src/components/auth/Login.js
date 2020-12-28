import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(formData)
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

export default Register;
