import React, { createContext, useContext, useReducer } from 'react';
import API from '../../utils/API';
import { AlertContext } from '../alert/AlertProvider';
import quizReducer from './quizReducer';
import { GET_QUESTIONS, QUESTION_ERROR, SUBMIT_QUESTION } from './quizTypes';

const INITIAL_STATE = {
  questions: [],
  error: null,
  loading: true,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  getQuestions: () => {},
  submitQuestion: (formData) => {},
};

export const QuizContext = createContext(CONTEXT_STATE);

export const QuizProvider = ({ children }) => {
  const { setAlert } = useContext(AlertContext);
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

  const getQuestions = async () => {
    try {
      const response = await API.get('questions');

      dispatch({
        type: GET_QUESTIONS,
        payload: response.data.data.questions,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const submitQuestion = async (formData) => {
    try {
      const response = await API.post('questions', formData);

      dispatch({ type: SUBMIT_QUESTION, payload: response.data.data });

      setAlert(
        'Your question was submitted succesfully. Thank you :)',
        'success',
        3000
      );
    } catch (error) {
      dispatch({
        type: QUESTION_ERROR,
        payload: error.response.data.message,
      });
      setAlert(
        'Your question was not submitted succesfully. Please try again!',
        'danger',
        3000
      );
    }
  };

  return (
    <QuizContext.Provider
      value={{
        ...state,
        getQuestions,
        submitQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
