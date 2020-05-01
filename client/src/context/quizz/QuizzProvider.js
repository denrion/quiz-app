import React, { createContext, useReducer } from 'react';
import API from '../../utils/API';
import quizzReducer from './quizzReducer';
import { QUESTION_ERROR, SUBMIT_QUESTION } from './quizzTypes';

const INITIAL_STATE = {
  questions: [],
  error: null,
  loading: true,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  submitQuestion: (formData) => {},
};

export const QuizzContext = createContext(CONTEXT_STATE);

export const QuizzProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizzReducer, INITIAL_STATE);

  const submitQuestion = async (formData) => {
    try {
      const response = await API.post('questions', formData);

      dispatch({ type: SUBMIT_QUESTION, payload: response.data.data });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: QUESTION_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  return (
    <QuizzContext.Provider
      value={{
        ...state,
        submitQuestion,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
};
