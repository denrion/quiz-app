import axios from 'axios';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://les-quizerables.herokuapp.com'
    : 'http://localhost:5000';

let API_URL = `${BASE_URL}/api/v1/`;

const API = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

API.interceptors.request.use(
  function (config) {
    // Set Bearer token
    const token = localStorage.getItem('token');

    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    // Set Content Type
    if (config.method === 'post')
      config.headers['Content-Type'] = 'application/json';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
