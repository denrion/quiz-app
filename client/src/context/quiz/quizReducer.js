import { QUESTION_ERROR, SUBMIT_QUESTION } from './quizTypes';

const quizReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default quizReducer;
