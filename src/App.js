import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Containers/Login';
import {
  BrowserRouter as Router,
  Route
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
