import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import QuizzesList from '../../quiz/components/QuizzesList';
import './PlayerDashboard.scss';

const PlayerDashboard = () => {
  const { user } = useAuth();
  const { getQuizzes, quizzes } = useContext(QuizContext);

  useEffect(() => {
    if (!quizzes) getQuizzes({ fieldName: 'participants[in]', value: user.id });

    // eslint-disable-next-line
  }, []);

  return (
    <section className='player-quizzes'>
      {quizzes && quizzes.length === 0 ? (
        <h1>There are no active quizzes right now</h1>
      ) : (
        <QuizzesList quizzes={quizzes} />
      )}
    </section>
  );
};

export default PlayerDashboard;
