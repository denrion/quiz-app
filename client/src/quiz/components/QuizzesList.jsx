import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import QuizItem from './QuizItem';
import './QuizzesList.scss';

const QuizzesList = () => {
  const quizzes = [
    { id: 1, name: 'Quiz1', numQuestions: 23, quizmaster: 'Quizmaster1' },
    { id: 2, name: 'Quiz2', numQuestions: 35, quizmaster: 'Quizmaster2' },
    { id: 2, name: 'Quiz2', numQuestions: 35, quizmaster: 'Quizmaster2' },
  ];

  const onCreateQuizHandler = () => alert('Create Quiz');

  return (
    <ul className='quizzes-list'>
      {quizzes.map((quiz) => (
        <QuizItem key={quiz.id} quiz={quiz} />
      ))}
      <Button
        size='small'
        color='primary'
        shape='round'
        className='quizzes-list-add'
        onClick={onCreateQuizHandler}
      >
        <i class='fas fa-plus' />
      </Button>
    </ul>
  );
};

export default QuizzesList;
