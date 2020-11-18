import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Login from './Login';
import Project from './Project';
import Signup from './Signup';
import CreateProject from './CreateProject';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/project/:id" component={Project} />
        <Route path="/signup" component={Signup} />
        <Route path="/projects/submit" component={CreateProject} />
        <Route path="*" render={() => <div className="text-center p-5"><h1>Oops you're lost</h1></div> } />
      </Switch>
    </Router>
  );
}

export default App;
