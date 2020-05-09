import React, { createContext, useReducer } from 'react';
import API from '../../utils/API';
import { setLoading } from '../shared/sharedActions';
import userReducer from './userReducer';
import { GET_USERS, USER_ERROR } from './userTypes';

const INITIAL_STATE = {
  users: null,
  error: null,
  loading: false,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  getUsers: (filters = [], page = 1, limit = 100, sort = '-createdAt') => {},
};

export const UserContext = createContext(CONTEXT_STATE);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const getUsers = async (
    filters,
    page = 1,
    limit = 100,
    sort = '-createdAt'
  ) => {
    try {
      setLoading(dispatch);

      const filterString =
        filters &&
        filters
          .map((filter) => `${filter.fieldName}=${filter.value}`)
          .join('&');

      const url = `users?${filterString}&page=${page}&limit=${limit}&sort=${sort}`;

      const response = await API.get(url);

      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
