import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory 
  } from "react-router-dom";


import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
