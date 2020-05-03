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
  SET_LOADING,
  USER_LOADED,
} from './authTypes';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  loadCurrentUser: () => {},
  registerUser: (formData) => {},
  loginUser: (formData) => {},
  logoutUser: () => {},
  clearErrors: () => {},
};

export const AuthContext = createContext(CONTEXT_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const loadCurrentUser = async () => {
    setLoading();

    try {
      const response = await API.get('auth/me');

      dispatch({ type: USER_LOADED, payload: response.data.data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  const registerUser = async (formData) => {
    try {
      setLoading();

      const response = await API.post('auth/signup', formData);

      dispatch({ type: REGISTER_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  const loginUser = async (formData) => {
    try {
      setLoading();

      const response = await API.post('auth/login', formData);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  const logoutUser = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        clearErrors,
        loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
