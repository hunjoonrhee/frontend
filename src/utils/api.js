import axios from 'axios';
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;
const backendURL = process.env.NODE_ENV === 'production' ? BACKEND_PROXY : LOCAL_BACKEND;
console.log(backendURL);
const api = axios.create({
  baseURL: backendURL + '/api',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`;
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

export default api;
