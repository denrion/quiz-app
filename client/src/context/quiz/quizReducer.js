import { SET_LOADING } from '../shared/sharedTypes';
import {
  ADD_PARTICIPANT_TO_QUIZ,
  ADD_QUESTION_TO_QUIZ,
  CREATE_QUIZ,
  GET_QUIZ,
  GET_QUIZZES,
  QUIZ_ERROR,
  SET_ACTIVE_QUESTION,
} from './quizTypes';

const quizReducer = (state, action) => {
  switch (action.type) {
    case GET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload.data.quizzes,
        totalResults: action.payload.totalResults,
        loading: false,
      };
    case GET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        loading: false,
      };
    case CREATE_QUIZ:
      return {
        ...state,
        quizzes: [action.payload, ...state.quizzes],
        loading: false,
      };
    case ADD_QUESTION_TO_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz) =>
          quiz.id === action.payload.id ? action.payload : quiz
        ),
        loading: false,
      };
    case ADD_PARTICIPANT_TO_QUIZ:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          participants: action.payload.participants,
        },
        loading: false,
      };
    case SET_ACTIVE_QUESTION:
      return {
        ...state,
        activeQuestion: action.payload,
        loading: false,
      };
    case QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default quizReducer;
