import axios from 'axios';

const API = axios.create({
  baseURL: 'https://frozen-harbor-86163.herokuapp.com/api/v1/',
  // baseURL: 'http://localhost:5000/api/v1/',
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
