import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import './QuizItem.scss';

const QuizItem = ({ quiz }) => {
  return (
    <li className='quiz-item'>
      <Card className='quiz-item__content'>
        <Link to={`/quizzes/${quiz.id}`}>
          <div className='quiz-item__info'>
            <h2>{quiz.name}</h2>
            <p>Questions: {quiz.numQuestions}</p>
            <p>Quizmaster: {quiz.quizmaster}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default QuizItem;
