import React, { createContext, useReducer } from 'react';
import API from '../../utils/API';
import authReducer from './authReducer';
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from './authTypes';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  loadUser: () => {},
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  clearErrors: () => {},
};

export const AuthContext = createContext(CONTEXT_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  // Load User
  const loadUser = async () => {
    try {
      const res = await API.get('auth/me');

      dispatch({ type: USER_LOADED, payload: res.data.data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const registerUser = async (formData) => {
    try {
      const response = await API.post('auth/signup', formData);

      dispatch({ type: REGISTER_SUCCESS, payload: response.data.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  // Login User
  const loginUser = async (formData) => {
    try {
      const response = await API.post('auth/login', formData);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  // Logout
  const logoutUser = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        registerUser,
        loginUser,
        logoutUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
