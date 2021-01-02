import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Landing from '../src/components/layout/Landing';
import Navbar from '../src/components/layout/Navbar';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import Alert from '../src/components/layout/Alert';
import Dashboard from '../src/components/dashboard/Dashboard';
import CreateProfile from '../src/components/profile-forms/CreateProfile';
import EditProfile from '../src/components/profile-forms/EditProfile';
import AddExperience from '../src/components/profile-forms/AddExperience';
import AddEducation from '../src/components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';


import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { store } from './redux/store';
import { loadUser } from './redux/auth/auth.actions';

if(localStorage.token) {
  setAuthToken(localStorage.token)
};

const App = ({ user }) => {
  useEffect(() => {
    store.dispatch(loadUser())
  },[loadUser]);

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(App);
