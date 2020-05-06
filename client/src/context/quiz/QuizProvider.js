import React, { createContext, useReducer } from 'react';
import API from '../../utils/API';
import { setLoading } from '../shared/sharedActions';
import {} from '../shared/sharedTypes';
import quizReducer from './quizReducer';
import {
  ADD_QUESTION_TO_QUIZ,
  CREATE_QUIZ,
  GET_QUIZZES,
  QUIZ_ERROR,
} from './quizTypes';

const INITIAL_STATE = {
  quizzes: null,
  currentQuiz: null,
  totalResults: 10,
  error: null,
  loading: false,
};

const CONTEXT_STATE = {
  ...INITIAL_STATE,
  getQuizzes: (field, page = 1, limit = 10, sort = '-createdAt') => {},
  createQuiz: (formData) => {},
  addQuestionsToQuiz: (quizId, questions) => {},
};

export const QuizContext = createContext(CONTEXT_STATE);

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

  const getQuizzes = async (
    field,
    page = 1,
    limit = 10,
    sort = '-createdAt'
  ) => {
    try {
      setLoading(dispatch);

      const fieldString = field && `${field.fieldName}=${field.value}`;
      const url = `quizzes?${fieldString}&page=${page}&limit=${limit}&sort=${sort}`;

      const response = await API.get(url);

      dispatch({
        type: GET_QUIZZES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: QUIZ_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const createQuiz = async (formData) => {
    try {
      setLoading(dispatch);
      const response = await API.post('quizzes', formData);
      dispatch({ type: CREATE_QUIZ, payload: response.data.data.quiz });
    } catch (error) {
      dispatch({
        type: QUIZ_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const addQuestionsToQuiz = async (quizId, questions) => {
    try {
      setLoading(dispatch);

      const response = await API.post(`quizzes/${quizId}/questions`, questions);

      dispatch({
        type: ADD_QUESTION_TO_QUIZ,
        payload: response.data.data.quiz,
      });
    } catch (error) {
      dispatch({
        type: QUIZ_ERROR,
        payload: error.response.data.message,
      });
    }

    return (
      <QuizContext.Provider
        value={{
          ...state,
          getQuizzes,
          createQuiz,
          addQuestionsToQuiz,
        }}
      >
        {children}
      </QuizContext.Provider>
    );
  };
};
