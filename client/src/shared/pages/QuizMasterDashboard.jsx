import React from 'react';
import Questions from '../../question/components/Questions';
import QuizzesList from '../../quiz/components/QuizzesList';

const QuizMasterDashboard = () => {
  return (
    <>
      <section className='my-3'>
        <QuizzesList />
      </section>

      <section className='my-3'>
        <Questions />
      </section>
    </>
  );
};

export default QuizMasterDashboard;
