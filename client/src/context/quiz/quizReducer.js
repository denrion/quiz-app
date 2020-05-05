import { SET_LOADING } from '../sharedTypes';
import { GET_QUESTIONS, QUESTION_ERROR, SUBMIT_QUESTION } from './quizTypes';

const quizReducer = (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data.questions,
        totalResults: action.payload.totalResults,
        loading: false,
      };
    case SUBMIT_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        loading: false,
      };
    case QUESTION_ERROR:
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
