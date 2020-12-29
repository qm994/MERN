import React, { Fragment } from 'react';
import Landing from '../src/components/layout/Landing';
import Navbar from '../src/components/layout/Navbar';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';

import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
