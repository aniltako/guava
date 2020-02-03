import auth0 from 'auth0';

class Auth {
  auth;
  constructor(){
    this.auth = new auth0.WebAuth({
      domain: ``,
      clientID: ``,
      redirectUri: ``,
      responseType: '',
      scope: '',
      audience: ``
    });
  }

  login(state) {
    this.auth.authorize({ state });
  }

  /**
   * Authenticate user by parseHash url
   */
  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth.parseHash((err, response) => {
        if (response) {
          return resolve(response);
        } else if (err) {
          return reject(err);
        }
      });
    })
  }

  getProfile = (accessToken) => {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          resolve(profile);
        }
        reject(err);
      });
    })
  }

  /**
   * Return if user is logout or not
   * If not logout set a new session
   */
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      this.auth.checkSession({},(err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        } 
      })
    })
  }

  /**
   * Silent Authentication if user not logout
   */
  silentAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth.checkSession({prompt: 'none'},
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        } 
      });
    })
  }
  
}

const AuthInstance = new Auth();
Object.freeze(AuthInstance);

export default AuthInstance;