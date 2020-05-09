import { SET_LOADING } from '../shared/sharedTypes';
import {
  GET_QUESTIONS,
  QUESTION_ERROR,
  SUBMIT_QUESTION,
  UPDATE_QUESTION,
} from './questionTypes';

const questionReducer = (state, action) => {
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
        questions: [action.payload, ...state.questions],
        totalResults: ++action.payload.totalResults,
        loading: false,
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? action.payload : question
        ),
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

export default questionReducer;
