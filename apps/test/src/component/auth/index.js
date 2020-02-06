import React, { useEffect } from 'react';
import { AuthInstance } from '@guava/auth0-js';

const Auth =() => {

  useEffect(() => {
    AuthInstance.login();
  },[])

  return (
    <div>Guava Auth0</div>
  )
}

export default Auth;