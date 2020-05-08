import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Card from '../../shared/components/UIElements/Card';
import './QuizItem.scss';

const QuizItem = ({ quiz }) => {
  const { user } = useAuth();

  return (
    <li className='quiz-item'>
      <Card className='quiz-item__content'>
        <Link
          to={
            user.role === 'PLAYER'
              ? `/quizzes/${quiz.id}/${user.id}`
              : `/quizzes/${quiz.id}`
          }
        >
          <div className='quiz-item__info'>
            <h2>{quiz.name}</h2>
            <p>Questions: {quiz.questions.length}</p>
            <p>Participants: {quiz.participants.length}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

PropTypes.QuizItem = {
  quiz: PropTypes.object.isRequired,
};

export default QuizItem;
