import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    };
    
    return (
        <div>
            <section class="landing">
                <div class="dark-overlay">
                    <div class="landing-inner">
                    <h1 class="x-large">Developer Connector</h1>
                    <p class="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div class="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
