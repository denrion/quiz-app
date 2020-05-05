import React from 'react';
import Questions from '../../question/components/Questions';
import QuizzesList from '../../quiz/components/QuizzesList';

const QuizMasterDashboard = () => {
  return (
    <>
      <h1 className='text-center my-2'>Quizzes</h1>
      <QuizzesList />

      <h1 className='text-center my-2'>Questions</h1>
      <Questions />
    </>
  );
};

export default QuizMasterDashboard;
