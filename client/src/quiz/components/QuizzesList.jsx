import React from 'react';
import QuizItem from './QuizItem';
import './QuizzesList.scss';

const QuizzesList = ({ quizzes }) => {
  return (
    <ul className='quizzes-list'>
      {quizzes && quizzes.length === 0 && (
        <h4 className='center'>No quizzes to show. Please create one.</h4>
      )}

      {quizzes && quizzes.map((quiz) => <QuizItem key={quiz.id} quiz={quiz} />)}
    </ul>
  );
};

export default QuizzesList;
