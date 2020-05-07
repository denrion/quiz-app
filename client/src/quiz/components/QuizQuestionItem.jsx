import React from 'react';

const QuizQuestionItem = ({ question, ...otherProps }) => {
  return (
    <li {...otherProps}>
      {question.questionText} -{' '}
      <span style={{ fontWeight: 'bold' }}>
        {question.submittedBy.displayName}
      </span>
    </li>
  );
};

export default QuizQuestionItem;
