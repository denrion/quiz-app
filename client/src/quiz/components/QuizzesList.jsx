import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import Button from '../../shared/components/FormElements/Button';
import Spinner from '../../shared/components/UIElements/Spinner';
import QuizItem from './QuizItem';
import './QuizzesList.scss';
import QuizzModalForm from './QuizzModalForm';

const QuizzesList = () => {
  const { user } = useAuth();
  const { getQuizzes, loading, quizzes } = useContext(QuizContext);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (!quizzes)
      getQuizzes({
        fieldName: 'quizmaster',
        value: user.id,
      });

    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <QuizzModalForm showModal={showModal} toggleModal={toggleModal} />

      <ul className='quizzes-list'>
        <Button
          size='small'
          color='primary'
          shape='round'
          className='quizzes-list-add'
          onClick={toggleModal}
        >
          <i className='fas fa-plus' />
        </Button>

        {quizzes && quizzes.length === 0 && (
          <h4 className='center'>No quizzes to show. Please create one.</h4>
        )}

        {quizzes &&
          quizzes.map((quiz) => <QuizItem key={quiz.id} quiz={quiz} />)}
      </ul>
    </>
  );
};

export default QuizzesList;
