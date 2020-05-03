import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";
import ProtectedRoute from "./ProtectedRoute";

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
import JobDetail from './components/JobDetail';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
          <Route exact path="/"/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/signup" component={SignUp}/>
          <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
          <ProtectedRoute exact path="/signout" />
          <Route exact path="/dashboard/jobs/:id" component={JobDetail}/>
      </Switch>
    </div>
  );
}

export default App;
