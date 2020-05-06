import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import Button from '../../shared/components/FormElements/Button';
import Spinner from '../../shared/components/UIElements/Spinner';
import QuizItem from './QuizItem';
import './QuizzesList.scss';

const QuizzesList = () => {
  const { user } = useAuth();
  const { getQuizzes, loading, quizzes } = useContext(QuizContext);

  useEffect(() => {
    if (quizzes.length === 0)
      getQuizzes({
        fieldName: 'quizmaster',
        value: user.id,
      });

    // eslint-disable-next-line
  }, []);

  const onCreateQuizHandler = () => alert('Create Quiz');

  if (loading) return <Spinner />;

  return (
    <ul className='quizzes-list'>
      {quizzes && quizzes.map((quiz) => <QuizItem key={quiz.id} quiz={quiz} />)}
      <Button
        size='small'
        color='primary'
        shape='round'
        className='quizzes-list-add'
        onClick={onCreateQuizHandler}
      >
        <i className='fas fa-plus' />
      </Button>
    </ul>
  );
};

export default QuizzesList;
