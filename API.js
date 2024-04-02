// @flow
import axios from 'axios';

const API = axios.create();

/**
 * Interceptor for all requests
 */
API.interceptors.request.use(
  async config => {
    /**
     * Add your request interceptor logic here: setting headers, authorization etc.
     */

    config.headers['Content-Type'] = 'application/json';

    // console.log(config.headers);

    return config;
  },
  error => {
    /**
     * Add your error handlers here
     */
    console.log('error:', error);

    return Promise.reject(error);
  },
);

/**
 * Interceptor for all responces
 */
API.interceptors.response.use(
  response => {
    /**
     * Add logic for successful response
     */
    // console.log('response:', response);

    return response;
  },
  error => {
    /**
     * Add logic for any error from backend
     */

    if (error?.message == 'Network Error') {
      showErrorMessage('Internet connection cannot be established!');
    }

    return Promise.reject(error);
  },
);

export default API;
