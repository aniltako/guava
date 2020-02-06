import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import Auth from './component/auth';
import Axios from './component/axios';
import Home from './component/home';

const App = () => {
  return (
    <div className="app">
      <Router>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          <li>
            <Link to="/axios">Axios</Link>
          </li>
        </ul>
        <Switch>
          <Route path={['/', '/home']} component={Home} />
          <Route extact path="/auth" component={Auth} />
          <Route extact path="/axios" component={Axios} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;