import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import Auth from './component/auth';
import Axios from './component/axios';

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
        <li>
          <Link to="/axios">Axios</Link>
        </li>
      </ul>
      <Switch>
        <Route extact path="/auth" component={Auth} />
        <Route extact path="/axios" component={Axios} />
      </Switch>
    </Router>
  )
}

export default App;