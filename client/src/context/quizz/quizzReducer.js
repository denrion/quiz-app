import { QUESTION_ERROR, SUBMIT_QUESTION } from './quizzTypes';

const quizzReducer = (state, action) => {
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

export default quizzReducer;
