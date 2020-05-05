import React from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { quizId } = useParams();

  return <div>Load quiz with id: {quizId}</div>;
};

export default QuizPage;
