import React, { createContext, useReducer } from 'react';
import * as uuid from 'uuid';
import alertReducer from './alertReducer';
import { REMOVE_ALERT, SET_ALERT } from './alertTypes';

const INITIAL_STATE = {
  alerts: [],
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  setAlert: () => {},
};

export const AlertContext = createContext(CONTEXT_STATE);

export const AlertProvder = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);

  // Set Alert
  const setAlert = (message, type, timeout = 2500) => {
    const id = uuid.v4();

    dispatch({ type: SET_ALERT, payload: { message, type, id } });

    // Remove Alert after 5 seconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
