import React from 'react';
// import { Auth } from '@guava/auth0-js';

class App extends React.Component {

  componentDidMount() {
    console.log(process.env.AUTH0_DOMAIN)
    // console.log(Auth);
  }

  render() {
    return (
      <div>Guava Test!</div>
    )
  }
}

export default App;