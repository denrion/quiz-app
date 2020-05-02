import React, { createContext, useReducer } from 'react';
import API from '../../utils/API';
import quizReducer from './quizReducer';
import { QUESTION_ERROR, SUBMIT_QUESTION } from './quizTypes';

const INITIAL_STATE = {
  questions: [],
  error: null,
  loading: true,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  submitQuestion: (formData) => {},
};

export const QuizContext = createContext(CONTEXT_STATE);

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

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
    <QuizContext.Provider
      value={{
        ...state,
        submitQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
