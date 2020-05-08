import React, { useContext } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import QuizQuestionItem from './QuizQuestionItem';

const QuizQuestionsList = ({ questions, socket }) => {
  const { setActiveQuestion } = useContext(QuizContext);

  const onSetActiveQuestionHandler = (question) => {
    setActiveQuestion(question);
    const { answer, createdAt, ...questionForPlayer } = question;

    socket.emit('activeQuestion', questionForPlayer);
  };

  return (
    <ul>
      {questions &&
        questions.map((question) => (
          <QuizQuestionItem
            key={question.id}
            question={question}
            onClick={() => onSetActiveQuestionHandler(question)}
          />
        ))}
    </ul>
  );
};

export default QuizQuestionsList;
