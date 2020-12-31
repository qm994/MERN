import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addExperience } from '../../redux/profile/profile.actions';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    const [toDateDisabled, toggleDisabled] = useState(false);
    const { company, title, location, from, to, current, description } = formData;

    //TODOS: onChange
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addExperience(formData, history);
    };

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add An Experience
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={onSubmit}>
                <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e) => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }} /> Current Job</p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input 
                        type="date" name="to" value={to}
                        disabled={
                            toDateDisabled ? "disabled" : ''
                        }
                        onChange={onChange} />
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addExperience })(AddExperience));
