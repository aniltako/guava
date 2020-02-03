import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error.response);
});

const asyncFunction = (request) => {
  return new Promise((resolve, reject) => {
    axios.request(request)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export {
  axios,
  asyncFunction
} 
