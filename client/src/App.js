import './App.css';
import React, { Fragment } from 'react';
import Landing from '../src/components/layout/Landing';
import Navbar from '../src/components/layout/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <Landing />
      <Navbar />
      <h1>App</h1>
    </Fragment>
  );
}

export default App;
