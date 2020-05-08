import React, { useContext } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import QuizQuestionItem from './QuizQuestionItem';

const QuizQuestionsList = ({ questions }) => {
  const { setActiveQuestion } = useContext(QuizContext);

  return (
    <ul>
      {questions &&
        questions.map((question) => (
          <QuizQuestionItem
            key={question.id}
            question={question}
            onClick={() => setActiveQuestion(question)}
          />
        ))}
    </ul>
  );
};

export default QuizQuestionsList;
