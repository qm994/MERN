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
import setAuthToken from './utils/setAuthToken';
import { store } from './redux/store';
import { loadUser } from './redux/auth/auth.actions';

if(localStorage.token) {
  setAuthToken(localStorage.token)
};

const App = ({ user }) => {
  useEffect(() => {
    store.dispatch(loadUser())
  },[]);

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
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect()(App);
