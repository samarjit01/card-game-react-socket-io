import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Column, Col} from 'react-bootstrap';
import { Container } from 'semantic-ui-react';
import Login from './Containers/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './Containers/Dashboard';


const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route  path="/play" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
